using ProyectNettApi.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using ProyectNettApi.DTO;
using ProyectNettApi.Models;
using System.Data;
using Newtonsoft.Json;

namespace ProyectNettApi.Repositories
{
    public class EmpleadoRepositorio : IEmpleadoRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public EmpleadoRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Empleados) y FILTRA EMPLEADO gregoryput
        public IEnumerable<EmpleadoDTO> GetEmpleado()
        {
            string query = "dbo.ListadoEmpleadoV2";
            using (var connection = _conexionDB.GetConnection(_configuration))
            {
                var resultSet = connection.Query<EmpleadoDTO>(query, commandType: CommandType.StoredProcedure);

                foreach (var empleado in resultSet)
                {
                    if (empleado.CargoEmpleadoDTOsJson != null)
                    {
                        empleado.CargoEmpleadoDTOs = JsonConvert.DeserializeObject<List<CargoEmpleadoDTO2>>(empleado.CargoEmpleadoDTOsJson);
                    }
                    else
                    {
                        empleado.CargoEmpleadoDTOs = new List<CargoEmpleadoDTO2>(); // O puedes asignar null, dependiendo de tus necesidades.
                    }
                }

                return resultSet.ToList();
            }
        }

        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Empleados) y FILTRA EMPLEADO gregoryput

        public EmpleadoDTO GetInfoPersonalEmpleado(int Id)
        {
            string query = "dbo.GetPersonaInfoByIdEmpleado";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<EmpleadoDTO>(query, new { Id = Id }, commandType: CommandType.StoredProcedure);
            return resultSet.ToList()[0];
        }



        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Empleados) METODO PAGINADO:
        public (IEnumerable<EmpleadoDTO> empleados, int totalCount) GetEmpleados(int pageNumber, int pageSize)
        {
            string query = "dbo.ListadoEmpleados";
            var parameters = new DynamicParameters();
            parameters.Add("@PageNumber", pageNumber);
            parameters.Add("@PageSize", pageSize);

            using (var connection = _conexionDB.GetConnection(_configuration))
            {
                var resultSet = connection.Query<EmpleadoDTO>(query, parameters, commandType: CommandType.StoredProcedure);

                // Obtener el recuento total de clientes
                string countQuery = "SELECT COUNT(*) FROM dbo.Empleados";
                var totalCount = connection.ExecuteScalar<int>(countQuery);

                return (resultSet.ToList(), totalCount);
            }
        }


        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para INSERTAR Empleado):
        public void InsertarEmpleado(Empleado empleado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Persona: ........................................
                string queryPersona = "dbo.InsertarPersona";
                var dataEmpleado = new
                {
                    IdPersona = empleado.Persona.IdPersona,
                    Nombres = empleado.Persona.Nombres,
                    Apellidos = empleado.Persona.Apellidos,
                    Telefono1 = empleado.Persona.Telefono1,
                    Telefono2 = empleado.Persona.Telefono2,
                    Direccion = empleado.Persona.Direccion,
                    Correo = empleado.Persona.Correo,
                    FechaDeNacimiento = empleado.Persona.FechaDeNacimiento,
                    Cedula = empleado.Persona.Cedula,
                    IdSexo = empleado.Persona.IdSexo,
                    IdCiudad = empleado.Persona.IdCiudad,
                    IdCreadoPor = empleado.IdCreadoPor,

                };
                int IdPersona = connection.ExecuteScalar<int>(queryPersona, dataEmpleado, transaction, commandType: CommandType.StoredProcedure);


                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Empleado: ........................................
                int IdEmpleado = connection.ExecuteScalar<int>("dbo.InsertarEmpleado",
                    new
                    {
                        IdPersona,
                        empleado.IdCreadoPor,
                        empleado.FechadDeContratación
                    }, transaction, commandType: CommandType.StoredProcedure);



                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Cargos y EmpleadosCargos: ........................................
                foreach (var cargo in empleado.Cargos)
                {
                    // -- Inserto en la tabla EmpleadosCargos:
                    string query_EmpleadosCargos = "dbo.Insertar_EmpleadosCargos";
                    connection.Execute(query_EmpleadosCargos,
                        new
                        {
                            IdEmpleado = IdEmpleado,
                            IdCargo = cargo.IdCargo,
                            Descripcion = cargo.Descripcion,
                            IdCreadoPor = empleado.IdCreadoPor
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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ELIMINAR (desactivar) Empleados):
        public void EliminarEmpleado(int IdEmpleado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - Eliminando en la tabla Empleados_Cargos:
                connection.Execute("dbo.Eliminar_EmpleadosCargos", new { IdEmpleado }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Empleados:
                connection.Execute("dbo.EliminarEmpleados", new { IdEmpleado }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.EliminarPersonasEmpleado", new { IdEmpleado }, transaction,
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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTIVAR/ELIMINAR ):
        public void ActivarEmpleado(int IdEmpleado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - ACTIVANDO/RESTAURANDO en la tabla Empleado_Cargo:
                connection.Execute("dbo.Restaurar_Cargo_Empleado", new { IdEmpleado }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Empleado:
                connection.Execute("dbo.RestaurarEmpleado", new { IdEmpleado }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.RestaurarPersonasEmpleado", new { IdEmpleado }, transaction,
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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTUALIZAR Empleados):
        public void ActualizarEmpleado(Empleado empleado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Actualizar en la tabla Persona:
                connection.Execute("dbo.ActualizarPersona", new
                {
                    IdPersona = empleado.Persona.IdPersona,
                    Nombres = empleado.Persona.Nombres,
                    Apellidos = empleado.Persona.Apellidos,
                    Telefono1 = empleado.Persona.Telefono1,
                    Telefono2 = empleado.Persona.Telefono2,
                    Direccion = empleado.Persona.Direccion,
                    Correo = empleado.Persona.Correo,
                    FechaDeNacimiento = empleado.Persona.FechaDeNacimiento,
                    Cedula = empleado.Persona.Cedula,
                    IdSexo = empleado.Persona.IdSexo,
                    IdCiudad = empleado.Persona.IdCiudad,
                    IdModificadoPor = empleado.IdModificadoPor,
                }, transaction, commandType: CommandType.StoredProcedure);

                // Actualizar Cargos:
                foreach (var cargo in empleado.Cargos)
                {
                    // Si Cargo tiene IdCargo != 0 y IdEstadoRegistro != 2 se debe hacer un update:
                    if (cargo.IdCargo != 0 && cargo.IdEstadoRegistro != 2)
                    {
                        connection.Execute("dbo.ActualizarEmpleadosCargos", new
                        {
                            IdEmpleado = empleado.IdEmpleado,
                            IdCargo = cargo.IdCargo,
                            Descripcion = cargo.Descripcion,
                            IdModificadoPor = cargo.IdModificadoPor
                        }, transaction, commandType: CommandType.StoredProcedure);
                    }

                    // Si el Cargo tiene IdCargo != 0 y IdEstadoRegistro == 2 se debe hacer un delete:
                    else if (cargo.IdCargo != 0 && cargo.IdCargo == 2)
                    {
                        connection.Execute("dbo.Delete_EmpleadosCargos", new { IdCargo = cargo.IdCargo }, transaction,
                            commandType: CommandType.StoredProcedure);
                    }

                    // Si el cargo tiene IdCargo == 0 se debe hacer un insert:
                    else if (cargo.IdCargo == 0)
                    {
                        // -- Inserto en la tabla EmpleadosCargos:
                        string query_EmpleadosCargos = "dbo.Insertar_EmpleadosCargos";
                        connection.Execute(query_EmpleadosCargos,
                            new
                            {
                                IdEmpleado = empleado.IdEmpleado,
                                IdCargo = cargo.IdCargo,
                                Descripcion = cargo.Descripcion,
                                IdCreadoPor = empleado.IdCreadoPor
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
