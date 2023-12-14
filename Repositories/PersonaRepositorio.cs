using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class PersonaRepositorio : IPersonaRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public PersonaRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<PersonaInfoPersonalDTO> GetPersonasInfoPersonal()
        {
            string query = "dbo.GetDatosPersonales";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<PersonaInfoPersonalDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        public void InsertarPersona(Persona persona)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Persona: ........................................
                string queryProcedure = "dbo.InsertarPersona";
                var dataClient = new
                {
                    Nombres = persona.Nombres,
                    Apellidos = persona.Apellidos,
                    Telefono1 = persona.Telefono1,
                    Telefono2 = persona.Telefono2,
                    Direccion = persona.Direccion,
                    Correo = persona.Correo,
                    FechaDeNacimiento = persona.FechaDeNacimiento,
                    Cedula = persona.Cedula,
                    IdSexo = persona.IdSexo,
                    IdCiudad = persona.IdCiudad,
                    IdCreadoPor = persona.IdCreadoPor,
                };
                int IdPersona = connection.ExecuteScalar<int>(queryProcedure, dataClient, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Persona: ........................................
                string queryProcedureIPTP = "dbo.InsertPersonasTiposPersonas";
                var dataIPTP = new
                {
                    IdPersona = IdPersona,
                    IdTipoPersona = persona.PersonaTiposPersona.IdTipoPersona,
                    IdCreadoPor = persona.IdCreadoPor,
                };
                connection.ExecuteScalar(queryProcedureIPTP, dataIPTP, transaction, commandType: CommandType.StoredProcedure);

                //
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                string queryProcedureInserImage = "dbo.InsertarImagen";
                var imagen = persona.DataImagenPersona.Imagen;
                var dataImage = new
                {
                    FileName = imagen.FileName,
                    ContentType = imagen.ContentType,
                    FileSize = imagen.FileSize,
                    Data = imagen.Data,
                    IdCreadoPor = persona.IdCreadoPor
                };
                int IdImagen = connection.ExecuteScalar<int>(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);

                //
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                string queryProcedureIPI = "dbo.InsertarPersonaImagen";
                var dataIPI = new
                {
                    IdImagen = IdImagen,
                    IdPersona = IdPersona,
                    IdCreadoPor = persona.IdCreadoPor
                };
                connection.Execute(queryProcedureIPI, dataIPI, transaction, commandType: CommandType.StoredProcedure);

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
    }
}
