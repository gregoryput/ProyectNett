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
            // 1 Obtener listado de personas:
            string query = "dbo.GetDatosPersonales";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<PersonaInfoPersonalDTO>(query, commandType: CommandType.StoredProcedure);

            foreach (var item in resultSet)
            {
                // 1.1 Sacar datos de la relacion con la tabla PersonasTiposPersonas:
                var queryPTP = "EXEC dbo.Get_PersonasTiposPersonas_By_IdPersona";
                var resultPTP = _conexionDB.GetConnection(_configuration).Query<PersonaTipoPersona>(queryPTP, new { item.IdPersona }, commandType: CommandType.Text).ToList();
                item.PersonaTiposPersona = resultPTP;

                // 1.2 Sacar datos de la relacion con la tabla EntidadesPersonasFisicas:
                var queryExecProc1 = "EXEC dbo.Get_EntidadesPersonasFisicas_By_IdPersona";
                //
                var resultExecProc1 = _conexionDB.GetConnection(_configuration).Query<EntidadPersonaFisica>(queryExecProc1, new { item.IdPersona }, commandType: CommandType.Text).ToList();
                if (resultExecProc1.Count() > 0)
                {
                    item.DataEntidadPersonaFisica = resultExecProc1[0];
                }
                else
                {
                    item.DataEntidadPersonaFisica = null;
                }

                // 1.3 Sacar datos de la relacion con la tabla EntidadesPersonasFisicasRepresentantes:
                var queryExecProc2 = "EXEC dbo.Get_EntidadesPersonasFisicasRepresentantes_By_IdEntidadPersonaFisica";
                //
                var resultExecProc2 = _conexionDB.GetConnection(_configuration).Query<EntidadPersonaFisicaRepresentante>(queryExecProc2).ToList();
                if (resultExecProc2.Count() > 0)
                {
                    item.DataEntidadPersonaFisicaRepresentante = resultExecProc2[0];
                }
                else
                {
                    item.DataEntidadPersonaFisicaRepresentante = null;
                }
            }

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
                var dataPerson = new
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
                int IdPersona = connection.ExecuteScalar<int>(queryProcedure, dataPerson, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla PersonaTiposPersonas: ........................................
                foreach (var item in persona.PersonaTiposPersona)
                {
                    string queryProcedureIPTP = "dbo.InsertPersonasTiposPersonas";
                    var dataIPTP = new
                    {
                        IdPersona = IdPersona,
                        IdTipoPersona = item.IdTipoPersona,
                        IdCreadoPor = persona.IdCreadoPor,
                    };
                    connection.ExecuteScalar(queryProcedureIPTP, dataIPTP, transaction, commandType: CommandType.StoredProcedure);
                }

                //
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                // si viene imagen hago insert:
                var dataPersonaImagen = persona.DataImagenPersona;

                if (dataPersonaImagen != null)
                {
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
        //
        //
        //
        //
        //
        //
        //
        //
        // ACTUALIZAR PERSONA; --------------------------------------------------------------------------------------------------------------
        public void ActualizarPersona(Persona persona)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..U.P.D.A.T.E.. ACTUALIZADO en la tabla Persona: ........................................
                string queryProcedure = "dbo.ActualizarPersona";
                var dataPerson = new
                {
                    IdPersona = persona.IdPersona,
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
                    IdModificadoPor = persona.IdModificadoPor,
                };
                connection.Execute(queryProcedure, dataPerson, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla PersonaTiposPersonas: ........................................
                if (persona.PersonaTiposPersona != null)
                {
                    foreach (var item in persona.PersonaTiposPersona)
                    {
                        string queryProcedureIPTP = "dbo.InsertPersonasTiposPersonas";
                        var dataIPTP = new
                        {
                            IdPersona = persona.IdPersona,
                            IdTipoPersona = item.IdTipoPersona,
                            IdCreadoPor = persona.IdModificadoPor,
                        };
                        connection.Execute(queryProcedureIPTP, dataIPTP, transaction, commandType: CommandType.StoredProcedure);
                    }
                }

                // UPDATE, INSERT O DELETE A LA IMAGEN:
                var dataImagenPersona = persona.DataImagenPersona;

                // Si viene dataImagenPersona y el Data viene == "" es poque: INSERTO O ACTUALIZO
                if (dataImagenPersona != null && persona.DataImagenPersona.Imagen.Data != "")
                {
                    var imagen = persona.DataImagenPersona.Imagen;

                    // Si el IdImagen viene en 0 inserto la imagen:
                    if (imagen.IdImagen == 0)
                    {
                        //
                        // -
                        // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                        string queryProcedureInserImage = "dbo.InsertarImagen";
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
                            IdPersona = persona.IdPersona,
                            IdCreadoPor = persona.IdCreadoPor
                        };
                        connection.Execute(queryProcedureIPI, dataIPI, transaction, commandType: CommandType.StoredProcedure);
                    }

                    // SI EL ID IMAGEN NO VIENE EN CERO ACTUALIZO:
                    else
                    {
                        //
                        // -
                        // - ..U.P.D.A.T.E.. ACTUALIZANDO en la tabla Imagenes: ........................................
                        string queryProcedureInserImage = "dbo.ActualizarImagen";
                        var dataImage = new
                        {
                            IdImagen = imagen.IdImagen,
                            FileName = imagen.FileName,
                            ContentType = imagen.ContentType,
                            FileSize = imagen.FileSize,
                            Data = imagen.Data,
                            IdModificadoPor = persona.IdModificadoPor
                        };
                        connection.Execute(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);
                    }
                }

                // Si no viene dataimagen hago delete a la imagen
                else if (dataImagenPersona == null)
                {
                    string queryProcedureDeleteImae = "dbo.EliminarPersonaImagen";
                    connection.Execute(queryProcedureDeleteImae, new { IdPersona = persona.IdPersona }, transaction, commandType: CommandType.StoredProcedure);
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
    }
}
