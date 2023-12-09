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
                var dataClient = new 
                { 
                    IdPersona = cliente.Persona.IdPersona,
                    Nombres = cliente.Persona.Nombres,
                    Apellidos = cliente.Persona.Apellidos,
                    Telefono1 = cliente.Persona.Telefono1,
                    Telefono2 = cliente.Persona.Telefono2,
                    Direccion = cliente.Persona.Direccion,
                    Correo = cliente.Persona.Correo,
                    FechaDeNacimiento = cliente.Persona.FechaDeNacimiento,
                    Cedula = cliente.Persona.Cedula,
                    IdSexo = cliente.Persona.IdSexo,
                    IdCiudad = cliente.Persona.IdCiudad,
                    IdCreadoPor = cliente.IdCreadoPor,

                };
                int IdPersona = connection.ExecuteScalar<int>(queryPersona, dataClient, transaction, commandType: CommandType.StoredProcedure);
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Clientes: ........................................
                int IdCliente = connection.ExecuteScalar<int>("dbo.InsertarCliente", 
                    new {
                        IdPersona,
                        cliente.IdCreadoPor,
                    }, transaction, commandType: CommandType.StoredProcedure);

                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en las tablas Empresas y Clientes_Empresas: ........................................

                /* -- Por cada empresa en la lista Cliente.Empresas hago una insersion en las en las tablas Empresas y Clientes_Empresas: -- */
                if (cliente.Empresas != null)
                {
                    foreach (var empresa in cliente.Empresas)
                    {
                        // -- Inserto en la tabla Empresas:
                        string queryEmpresa = "dbo.InsertarEmpresa";
                        var dataEmpresa = new
                        {
                            IdEmpresa = empresa.IdEmpresa,
                            NombreEmpresa = empresa.NombreEmpresa,
                            RNC = empresa.RNC,
                            SitioWeb = empresa.SitioWeb,
                            Correo = empresa.Correo,
                            Teléfono1 = empresa.Teléfono1,
                            Teléfono2 = empresa.Teléfono2,
                            Dirección = empresa.Dirección,
                            IdCiudad = empresa.IdCiudad,
                            IdCreadoPor = cliente.IdCreadoPor,

                        };
                        int IdEmpresa = connection.ExecuteScalar<int>(queryEmpresa, dataEmpresa, transaction, commandType: CommandType.StoredProcedure);

                        // -- Inserto en la tabla Clientes_Empresas:
                        string query_Clientes_Empresas = "dbo.Insertar_Cliente_Empresa";
                        connection.Execute(query_Clientes_Empresas,
                            new
                            {
                                IdCliente,
                                IdEmpresa,
                                cliente.IdCreadoPor,
                            }, transaction, commandType: CommandType.StoredProcedure);
                    }
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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DESACTIVAR/ELIMINAR CLIENTES):
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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTIVAR/ELIMINAR CLIENTES):
        public void ActivarCliente(int IdCliente)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - ACTIVANDO/RESTAURANDO en la tabla Clientes_Empresas:
                connection.Execute("dbo.Restaurar_Clientes_Empresas", new { IdCliente }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Empresas:
                connection.Execute("dbo.RestaurarEmpresas", new { IdCliente }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Clientes:
                connection.Execute("dbo.RestaurarClientes", new { IdCliente }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.RestaurarPersonas", new { IdCliente }, transaction,
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
                connection.Execute("dbo.ActualizarPersona", new
                {
                    IdPersona = cliente.Persona.IdPersona,
                    Nombres = cliente.Persona.Nombres,
                    Apellidos = cliente.Persona.Apellidos,
                    Telefono1 = cliente.Persona.Telefono1,
                    Telefono2 = cliente.Persona.Telefono2,
                    Direccion = cliente.Persona.Direccion,
                    Correo = cliente.Persona.Correo,
                    FechaDeNacimiento = cliente.Persona.FechaDeNacimiento,
                    Cedula = cliente.Persona.Cedula,
                    IdSexo = cliente.Persona.IdSexo,
                    IdCiudad = cliente.Persona.IdCiudad,
                    IdModificadoPor = cliente.IdModificadoPor,
                }, transaction, commandType: CommandType.StoredProcedure);

                // Actualizar empresas, 2 casos (1 - que el arreglo de empresas venga = null, en se caso hay que hacer delete a todas las empresas, 2 - que el arreglo venga con empresas):

                //Caso 1:
                if (cliente.Empresas == null || cliente.Empresas.Count == 0)
                {

                    string queryGetEmpresas = "dbo.GetEmpresasByClienteId";
                    var parameters = new DynamicParameters();
                    parameters.Add("@ClienteId", cliente.IdCliente);

                    /*
                     ->  Obtengo las empresas del cliente
                     ->  (Analizar si seria mas factible traer las empresas desde el front,
                     ->  es decir, almacenar un objeto de como estan las empresas antes de que el usuario actualice por medio del FieldArray del front)
                    */
                    List<Empresa> resultEmpresas = new List<Empresa>();
                    resultEmpresas = connection.Query<Empresa>(queryGetEmpresas, parameters, transaction, commandType: CommandType.StoredProcedure).ToList();

                    //Unir los IdEmpresa en un variable string separada por comas:
                    string empresasIds = string.Join(",", resultEmpresas.Select(e => e.IdEmpresa));

                    //Por cada empresa que el cliente tenia originalmente, ahora por cada una de ellas hay que hacer un delete divido en 2::

                    // DELETE PARTE 1 (BORRAR de la tabla Empresas):
                    connection.Execute("dbo.EliminarEmpresa_ByEmpresasIds", new { EmpresasIds = empresasIds }, transaction,
                        commandType: CommandType.StoredProcedure);

                    // DELETE PARTE 2 (BORRAR de la tabla ClientesEmpresas)
                    connection.Execute("dbo.EliminarClientes_Empresas_ByEmpresasIds", new { EmpresasIds = empresasIds }, transaction,
                        commandType: CommandType.StoredProcedure);
                }

                //Caso 2:
                else
                {
                    foreach (var empresa in cliente.Empresas)
                    {
                        // Si la empresa tiene IdEmpresa != 0 y IdEstadoRegistro != 2 se debe hacer un update:
                        if (empresa.IdEmpresa != 0 && empresa.IdEstadoRegistro != 2)
                        {
                            connection.Execute("dbo.ActualizarEmpresa", new
                            {
                                IdEmpresa = empresa.IdEmpresa,
                                NombreEmpresa = empresa.NombreEmpresa,
                                RNC = empresa.RNC,
                                Correo = empresa.Correo,
                                Teléfono1 = empresa.Teléfono1,
                                Teléfono2 = empresa.Teléfono2,
                                SitioWeb = empresa.SitioWeb,
                                Dirección = empresa.Dirección,
                                IdCiudad = empresa.IdCiudad,
                                IdModificadoPor = cliente.IdModificadoPor
                            }, transaction, commandType: CommandType.StoredProcedure);
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
                            int IdEmpresa = connection.ExecuteScalar<int>(queryEmpresa, new
                            {
                                IdEmpresa = empresa.IdEmpresa,
                                NombreEmpresa = empresa.NombreEmpresa,
                                RNC = empresa.RNC,
                                Correo = empresa.Correo,
                                Teléfono1 = empresa.Teléfono1,
                                Teléfono2 = empresa.Teléfono2,
                                SitioWeb = empresa.SitioWeb,
                                Dirección = empresa.Dirección,
                                IdCiudad = empresa.IdCiudad,
                                IdCreadoPor = cliente.IdModificadoPor,
                            }, transaction, commandType: CommandType.StoredProcedure);

                            string query_Clientes_Empresas = "dbo.Insertar_Cliente_Empresa";
                            connection.Execute(query_Clientes_Empresas,
                                new
                                {
                                    IdCliente = cliente.IdCliente,
                                    IdEmpresa = IdEmpresa,
                                    IdCreadoPor = cliente.IdModificadoPor,
                                }, transaction, commandType: CommandType.StoredProcedure);
                        }
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

        public (IEnumerable<ClienteDTO> clientes, int totalCount) GetClientesPag(int pageNumber, int pageSize)
        {
            string query = "dbo.ListadoClientesV2";
            var parameters = new DynamicParameters();
            parameters.Add("@PageNumber", pageNumber);
            parameters.Add("@PageSize", pageSize);

            using (var connection = _conexionDB.GetConnection(_configuration))
            {
                var resultSet = connection.Query<ClienteDTO>(query, parameters, commandType: CommandType.StoredProcedure);

                // Obtener el recuento total de clientes
                string countQuery = "SELECT COUNT(*) FROM dbo.Clientes";
                var totalCount = connection.ExecuteScalar<int>(countQuery);

                return (resultSet.ToList(), totalCount);
            }
        }

        public IEnumerable<ClienteDTO> GetClientes()
        {
            string query = "Execute dbo.GetListaCenerallientes";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ClienteDTO>(query);
            return resultSet.ToList();
        }

        public ClienteDTO GetInfoPersonalCliente(int IdCliente)
        {
            string query = "dbo.GetPersonaInfoByIdCliente";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ClienteDTO>(query, new { ClienteId = IdCliente}, commandType: CommandType.StoredProcedure);
            return resultSet.ToList()[0];
        }
    }
}