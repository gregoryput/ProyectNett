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
            // 1 - Obtener listado de personas:
            string query = "dbo.GetDatosPersonales";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<PersonaInfoPersonalDTO>(query, commandType: CommandType.StoredProcedure);


            // Por cada persona sacar los datos de la entidad:
            foreach (var item in resultSet)
            {
                // 1.1 Sacar datos de la relacion con la tabla PersonasTiposPersonas:
                var resultPTP = _conexionDB.GetConnection(_configuration).Query<PersonaTipoPersona>("dbo.Get_PersonasTiposPersonas_By_IdPersona", new { IdPersona = item.IdPersona }, commandType: CommandType.StoredProcedure).ToList();
                item.PersonaTiposPersona = resultPTP;

                // 1.2 - Sacar datos de la tabla Entidad. Datos de la Entidad relacionada con la entidad PersonaFisica:
                var resultPE = _conexionDB.GetConnection(_configuration).Query<Entidad>("dbo.Get_Entidad_By_IdPersona", new { IdPersona = item.IdPersona }, commandType: CommandType.StoredProcedure).ToList();

                // Si la persona ya esta relacionada con una entidad:
                if (resultPE.Count > 0)
                {
                    var Entidad = resultPE[0];

                    // 1.3 Sacar datos de la relacion con la tabla EntidadesPersonasFisicas:
                    var resultExecProc1 = _conexionDB.GetConnection(_configuration).Query<EntidadPersonaFisica>("dbo.Get_EntidadesPersonasFisicas_By_IdPersona", new { item.IdPersona }, commandType: CommandType.StoredProcedure).ToList();
                    if (resultExecProc1.Count() > 0)
                    {
                        Entidad.EntidadPersonaFisica = resultExecProc1[0];

                        // 1.4 Sacar datos de la relacion con la tabla EntidadesPersonasFisicasRepresentantes:
                        var resultExecProc2 = _conexionDB.GetConnection(_configuration).Query<EntidadPersonaFisicaRepresentante>("dbo.Get_EntidadesPersonasFisicasRepresentantes_By_IdEntidadPersonaFisica",
                            new { resultExecProc1[0].IdEntidadPersonaFisica }, commandType: CommandType.StoredProcedure).ToList();

                        if (resultExecProc2.Count() > 0)
                        {
                            Entidad.EntidadPersonaFisicaRepresentante = resultExecProc2[0];
                        }
                        else
                        {
                            Entidad.EntidadPersonaFisicaRepresentante = null;
                        }
                    }
                    else
                    {
                        Entidad.EntidadPersonaFisica = null;
                    }

                    // 1.4 Sacar datos de la relacion con la tabla Clientes:
                    var resultExecProc3 = _conexionDB.GetConnection(_configuration).Query<ClienteEntidad>("dbo.Get_EntidadCliente_By_IdPersona", 
                        new { item.IdPersona }, commandType: CommandType.StoredProcedure).ToList();

                    if (resultExecProc3.Count() > 0)
                    {
                        Entidad.ClienteEntidad = resultExecProc3[0];
                    }
                    else
                    {
                        Entidad.ClienteEntidad = null;
                    }

                    item.Entidad = Entidad;
                }

                // Si la persona no esta relacionada con una entidad:
                else
                {
                    item.Entidad = null;
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
