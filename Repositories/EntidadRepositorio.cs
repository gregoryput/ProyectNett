using Dapper;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;
using System.Data.Common;
using System.Transactions;

namespace ProyectNettApi.Repositories
{
    public class EntidadRepositorio : IEntidadRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;
        public EntidadRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public void InsertarEntidad(Entidad entidad)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Entidad: ................................................................................
                string queryInsertEntidad = "dbo.InsertarEntidad";
                var dataEntidad = new
                {
                    //IdEntidad = entidad.IdEntidad,
                    NombreEntidad = entidad.NombreEntidad,
                    IdTipoEntidad = entidad.IdTipoEntidad,
                    IdCreadoPor = entidad.IdCreadoPor
                };
                int IdEntidad = connection.ExecuteScalar<int>(queryInsertEntidad, dataEntidad, transaction, commandType: CommandType.StoredProcedure);



                // -
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla dbo.EntidadesRolesEntidades: ................................................................................
                var dataERolEn = entidad.EntidadRolEntidad;
                var dataEntidadRolEntidad = new
                {
                    IdEntidad = IdEntidad,
                    IdRolEntidad = dataERolEn.IdRolEntidad,
                    IdCreadoPor = entidad.IdCreadoPor,
                };
                connection.Execute("dbo.InsertarEntidadRolEntidad", dataEntidadRolEntidad, transaction, commandType: CommandType.StoredProcedure);



                // -
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla dbo.EntidadesPersonasFisicas: ................................................................................
                var dataEnPe = entidad.EntidadPersonaFisica;
                var dataEntidadPersonaFisica = new
                {
                    IdEntidad = IdEntidad,
                    IdPersona = dataEnPe.IdPersona,
                    IdCreadoPor = entidad.IdCreadoPor,
                };
                int IdEntidadPersonaFisica = connection.ExecuteScalar<int>("dbo.InsertarEntidadPersonaFisica", dataEntidadPersonaFisica, transaction, commandType: CommandType.StoredProcedure);



                // -
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla dbo.EntidadesPersonasFisicasRepresentantes: ................................................................................
                var dataEnPeFiPe = entidad.EntidadPersonaFisicaRepresentante;
                var dataEntidadPersonaFisicaRepresentante = new
                {
                    IdEntidadPersonaFisica = IdEntidadPersonaFisica,
                    IdRepresentanteActual = dataEnPeFiPe.IdRepresentanteActual,
                    IdRolRepresentante = dataEnPeFiPe.IdRolRepresentante,
                    FechaInicioRepresentante = DateTime.Now,
                    IdCreadoPor = entidad.IdCreadoPor,
                    // -> FechaFinRepresentante = DateTime.Now,
                };
                connection.Execute("dbo.InsertarEntidadPersonaFisicaRepresentante", dataEntidadPersonaFisicaRepresentante, transaction, commandType: CommandType.StoredProcedure);



                // -
                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla dbo.Clientes: ................................................................................
                var dataC = entidad.ClienteEntidad;
                var dataClientes = new
                {
                    Codigo = dataC.Codigo,
                    IdEntidad = IdEntidad,
                    FechaInicioCliente = DateTime.Now,
                    IdCreadoPor = entidad.IdCreadoPor,
                };
                connection.Execute("dbo.InsertarCliente", dataClientes, transaction, commandType: CommandType.StoredProcedure);

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
