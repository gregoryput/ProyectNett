using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class ProveedorRepositorio : IProveedorRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public ProveedorRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }




        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Proveedores):
        public IEnumerable<ProveedorDTO> GetProveedores()
        {
            string query = "Execute dbo.ListadoProveedores";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProveedorDTO>(query);
            return resultSet.ToList();
        }

        public ProveedorDTO GetInfoPersonalProveedor(int IdProveedor)
        {
           
                string query = "dbo.GetPersonaInfoByIdProveedor";
                var resultSet = _conexionDB.GetConnection(_configuration).Query<ProveedorDTO>(query, new { IdProveedor = IdProveedor }, commandType: CommandType.StoredProcedure);
                return resultSet.ToList()[0];
            
        }


        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para INSERTAR PROVEEDORES):
        public void InsertarProveedor(Proveedor proveedor)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Persona: ........................................
                string queryPersona = "dbo.InsertarPersona";
                var data = new
                {
                    IdPersona = proveedor.Persona.IdPersona,
                    Nombres = proveedor.Persona.Nombres,
                    Apellidos = proveedor.Persona.Apellidos,
                    Telefono1 = proveedor.Persona.Telefono1,
                    Telefono2 = proveedor.Persona.Telefono2,
                    Direccion = proveedor.Persona.Direccion,
                    Correo = proveedor.Persona.Correo,
                    FechaDeNacimiento = proveedor.Persona.FechaDeNacimiento,
                    Cedula = proveedor.Persona.Cedula,
                    IdSexo = proveedor.Persona.IdSexo,
                    IdCiudad = proveedor.Persona.IdCiudad,
                    IdCreadoPor = proveedor.IdCreadoPor,

                };
                int IdPersonaDeContacto = connection.ExecuteScalar<int>(queryPersona, data, transaction, commandType: CommandType.StoredProcedure);
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla : ........................................
                // - ..I.N.S.E.R.T.. Insertando en la tabla : ........................................
                int IdProveedor = connection.ExecuteScalar<int>("dbo.InsertarProveedor",
                    new
                    {
                        IdPersonaDeContacto,
                        proveedor.IdCreadoPor,

                    }, transaction, commandType: CommandType.StoredProcedure);
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en las tablas Empresas y Clientes_Empresas: ........................................

                /* -- Por cada empresa en la lista Cliente.Empresas hago una insersion en las en las tablas Empresas y Clientes_Empresas: -- */
                if (proveedor.Empresas != null)
                {
                    foreach (var empresa in proveedor.Empresas)
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
                            IdCreadoPor = proveedor.IdCreadoPor,

                        };
                        int IdEmpresa = connection.ExecuteScalar<int>(queryEmpresa, dataEmpresa, transaction, commandType: CommandType.StoredProcedure);

                        // -- Inserto en la tabla Clientes_Empresas:
                        string query_Proveedor_Empresas = "dbo.Insertar_Proveedor_Empresa";
                        connection.Execute(query_Proveedor_Empresas,
                            new
                            {
                                IdProveedor,
                                IdEmpresa,
                                proveedor.IdCreadoPor,
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




        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ELIMINAR PROVEEDORES):
        public void EliminarProveedor(int IdProveedor)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - Eliminando en la tabla Proveedores_Empresas:
                connection.Execute("dbo.Eliminar_Proveedores_Empresas", new { IdProveedor }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Empresas:
                connection.Execute("dbo.EliminarEmpresas_ByIdProveedor", new { IdProveedor }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Proveedor:
                connection.Execute("dbo.EliminarProveedores", new { IdProveedor }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.EliminarPersonas_ByIdProveedor", new { IdProveedor }, transaction,
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

        public void ActivarProveedor(int IdProveedor)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - ACTIVANDO/RESTAURANDO en la tabla Clientes_Empresas:
                connection.Execute("dbo.Restaurar_Proveedores_Empresas", new { IdProveedor }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Empresas:
                connection.Execute("dbo.RestaurarEmpresas_ByIdProveedor", new { IdProveedor }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Proveedor:
                connection.Execute("dbo.RestaurarProveedores", new { IdProveedor }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.RestaurarPersonasProveedor", new { IdProveedor }, transaction,
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


        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTUALIZAR PROVEEDORES):
        public void ActualizarProveedor(Proveedor proveedor)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Actualizar en la tabla Persona:
                connection.Execute("dbo.ActualizarPersona", new
                {
                    IdPersona = proveedor.Persona.IdPersona,
                    Nombres = proveedor.Persona.Nombres,
                    Apellidos = proveedor.Persona.Apellidos,
                    Telefono1 = proveedor.Persona.Telefono1,
                    Telefono2 = proveedor.Persona.Telefono2,
                    Direccion = proveedor.Persona.Direccion,
                    Correo = proveedor.Persona.Correo,
                    FechaDeNacimiento = proveedor.Persona.FechaDeNacimiento,
                    Cedula = proveedor.Persona.Cedula,
                    IdSexo = proveedor.Persona.IdSexo,
                    IdCiudad = proveedor.Persona.IdCiudad,
                    IdModificadoPor = proveedor.IdModificadoPor,
                }, transaction, commandType: CommandType.StoredProcedure);

                // Actualizar empresas, 2 casos (1 - que el arreglo de empresas venga = null, en se caso hay que hacer delete a todas las empresas, 2 - que el arreglo venga con empresas):

                //Caso 1:
                if (proveedor.Empresas == null || proveedor.Empresas.Count == 0)
                {

                    string queryGetEmpresas = "dbo.GetEmpresasByIdProveedor";
                    var parameters = new DynamicParameters();
                    parameters.Add("@IdProveedor", proveedor.IdProveedor);

                    /*
                     ->  Obtengo las empresas del proveedor
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
                    connection.Execute("dbo.EliminarProveedor_Empresas_ByEmpresasIds", new { EmpresasIds = empresasIds }, transaction,
                        commandType: CommandType.StoredProcedure);
                }

                //Caso 2:
                else
                {
                    foreach (var empresa in proveedor.Empresas)
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
                                IdModificadoPor = proveedor.IdModificadoPor
                            }, transaction, commandType: CommandType.StoredProcedure);
                        }

                        // Si la empresa tiene IdEmpresa != 0 y IdEstadoRegistro == 2 se debe hacer un delete:
                        else if (empresa.IdEmpresa != 0 && empresa.IdEstadoRegistro == 2)
                        {
                            connection.Execute("dbo.EliminarEmpresa_ByEmpresaId", new { IdEmpresa = empresa.IdEmpresa }, transaction,
                                commandType: CommandType.StoredProcedure);

                            connection.Execute("dbo.EliminarProveedor_Empresas_ByEmpresasIds", new { IdEmpresa = empresa.IdEmpresa }, transaction,
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
                                IdCreadoPor = proveedor.IdModificadoPor,
                            }, transaction, commandType: CommandType.StoredProcedure);

                            string query_Clientes_Empresas = "dbo.Insertar_Proveedor_Empresa";
                            connection.Execute(query_Clientes_Empresas,
                                new
                                {
                                    IdProveedor = proveedor.IdProveedor,
                                    IdEmpresa = IdEmpresa,
                                    IdCreadoPor = proveedor.IdModificadoPor,
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
    }
}
