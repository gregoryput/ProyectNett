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
                int IdPersona = connection.ExecuteScalar<int>(queryPersona, proveedor.Persona, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Proveedor: ........................................
                int IdProveedor = connection.ExecuteScalar<int>("dbo.InsertarProveedor",
                    new
                    {
                        proveedor.IdEstadoProveedor,
                        IdPersona,
                        //--
                        proveedor.IdCreadoPor,
                        proveedor.FechaCreacion,
                        proveedor.IdModificadoPor,
                        proveedor.FechaModificacion,
                        proveedor.IdEstadoRegistro
                    }, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en las tablas Empresas y Proveedores_Empresas: ........................................

                /* -- Por cada empresa en la lista Proveedor.Empresas hago una insersion en las en las tablas Empresas y Proveedores_Empresas: -- */
                foreach (var empresa in proveedor.Empresas)
                {
                    // -- Inserto en la tabla Empresas:
                    string queryEmpresa = "dbo.InsertarEmpresa";
                    int IdEmpresa = connection.ExecuteScalar<int>(queryEmpresa, empresa, transaction, commandType: CommandType.StoredProcedure);

                    // -- Inserto en la tabla Proveedores_Empresas:
                    string query_Proveedores_Empresas = "dbo.Insertar_Proveedor_Empresa";
                    connection.Execute(query_Proveedores_Empresas,
                        new
                        {
                            IdProveedor,
                            IdEmpresa,
                            proveedor.IdCreadoPor,
                            proveedor.FechaCreacion,
                            proveedor.IdModificadoPor,
                            proveedor.FechaModificacion,
                            proveedor.IdEstadoRegistro
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




        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTUALIZAR PROVEEDORES):
        public void ActualizarProveedor(Proveedor proveedor)
        {
            throw new NotImplementedException();
        }
    }
}
