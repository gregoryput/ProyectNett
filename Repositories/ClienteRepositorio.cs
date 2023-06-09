using Dapper;
using Microsoft.Data.SqlClient;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;
using System.Data.Common;
using System.Transactions;

namespace ProyectNettApi.Repositories
{
    public class ClienteRepositorio : IClienteRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public ClienteRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }




        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de CLIENTES):
        public IEnumerable<ClienteDTO> GetClientes()
        {
            string query = "Execute dbo.ListadoClientes";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ClienteDTO>(query);
            return resultSet.ToList();
        }



        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para INSERTAR CLIENTES):
        public void InsertarCliente(Cliente cliente)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Persona: ........................................
                string queryPersona = "dbo.InsertarPersona";
                int IdPersona = connection.ExecuteScalar<int>(queryPersona, cliente.Persona, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Clientes: ........................................
                int IdCliente = connection.ExecuteScalar<int>("dbo.InsertarCliente", 
                    new {
                        IdPersona,
                        cliente.IdCreadoPor,
                        cliente.FechaCreacion,
                        cliente.IdModificadoPor,
                        cliente.FechaModificacion,
                        cliente.IdEstadoRegistro
                    }, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en las tablas Empresas y Clientes_Empresas: ........................................

                /* -- Por cada empresa en la lista Cliente.Empresas hago una insersion en las en las tablas Empresas y Clientes_Empresas: -- */
                foreach (var empresa in cliente.Empresas)
                {
                    // -- Inserto en la tabla Empresas:
                    string queryEmpresa = "dbo.InsertarEmpresa";
                    int IdEmpresa = connection.ExecuteScalar<int>(queryEmpresa, empresa, transaction, commandType: CommandType.StoredProcedure);

                    // -- Inserto en la tabla Clientes_Empresas:
                    string query_Clientes_Empresas = "dbo.Insertar_Cliente_Empresa";
                    connection.Execute(query_Clientes_Empresas, 
                        new {
                            IdCliente, 
                            IdEmpresa,
                            cliente.IdCreadoPor,
                            cliente.FechaCreacion,
                            cliente.IdModificadoPor,
                            cliente.FechaModificacion,
                            cliente.IdEstadoRegistro
                        }, transaction, commandType: CommandType.StoredProcedure);
                }

                // - .C.O.M.M.I.T. Confirmo la transaccion
                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }



        //
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ELIMINAR CLIENTES):
        public void EliminarCliente(int IdCliente)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - Eliminando en la tabla Clientes_Empresas:
                connection.Execute("dbo.Eliminar_Clientes_Empresas", new { IdCliente }, transaction, 
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Empresas:
                connection.Execute("dbo.EliminarEmpresas", new { IdCliente }, transaction, 
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Clientes:
                connection.Execute("dbo.EliminarClientes", new { IdCliente }, transaction, 
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.EliminarPersonas", new { IdCliente }, transaction, 
                    commandType: CommandType.StoredProcedure);

                transaction.Commit();
            }

            catch (Exception ex)
            {
                transaction.Rollback();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }



        //
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTUALIZAR CLIENTES):
        public void ActualizarCliente(Cliente cliente)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Actualizar en la tabla Persona:
                connection.Execute("dbo.ActualizarPersona", cliente.Persona, transaction,
                       commandType: CommandType.StoredProcedure);

                // Actualizar empresas:
                foreach (var empresa in cliente.Empresas)
                {
                    // Si la empresa tiene IdEmpresa != 0 y IdEstadoRegistro != 2 se debe hacer un update:
                    if (empresa.IdEmpresa != 0 && empresa.IdEstadoRegistro != 2)
                    {
                        connection.Execute("dbo.ActualizarEmpresa", empresa, transaction, commandType: CommandType.StoredProcedure);
                    }

                    // Si la empresa tiene IdEmpresa != 0 y IdEstadoRegistro == 2 se debe hacer un delete:
                    else if (empresa.IdEmpresa != 0 && empresa.IdEstadoRegistro == 2)
                    {
                        connection.Execute("dbo.EliminarEmpresa_ByEmpresaId", new { IdEmpresa = empresa.IdEmpresa }, transaction,
                            commandType: CommandType.StoredProcedure);

                        connection.Execute("dbo.EliminarClientes_Empresas_ByEmpresaId", new { IdEmpresa = empresa.IdEmpresa }, transaction,
                            commandType: CommandType.StoredProcedure);
                    }

                    // Si la empresa tiene IdEmpresa == 0 se debe hacer un insert:
                    else if (empresa.IdEmpresa == 0)
                    {
                        string queryEmpresa = "dbo.InsertarEmpresa";
                        int IdEmpresa = connection.ExecuteScalar<int>(queryEmpresa, empresa, transaction, commandType: CommandType.StoredProcedure);

                        string query_Clientes_Empresas = "dbo.Insertar_Cliente_Empresa";
                        connection.Execute(query_Clientes_Empresas,
                            new
                            {
                                cliente.IdCliente,
                                IdEmpresa,
                                cliente.IdCreadoPor,
                                cliente.FechaCreacion,
                                cliente.IdModificadoPor,
                                cliente.FechaModificacion,
                                cliente.IdEstadoRegistro
                            }, transaction, commandType: CommandType.StoredProcedure);
                    }
                }
                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }
    }
}