using ProyectNettApi.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using ProyectNettApi.DTO;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class EmpleadoRepositorio :IEmpleadoRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public EmpleadoRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Empleado):
        public IEnumerable<EmpleadoDTO> GetEmpleado()
        {
            string query = " Execute dbo.ListadoEmpleados";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<EmpleadoDTO>(query);
            return resultSet.ToList();
        }



        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Empleado) METODO PAGINADO:
        public (IEnumerable<EmpleadoDTO> clientes, int totalCount) GetClientes(int pageNumber, int pageSize)
        {
            string query = "dbo.ListadoClientesV2";
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
                    Edad = empleado.Persona.Edad,
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
                    }, transaction, commandType: CommandType.StoredProcedure);

       

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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ELIMINAR Empleado):
        public void EliminarEmpleado(int IdEmpleado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
      
                // - Eliminando en la tabla Clientes:
                connection.Execute("dbo.EliminarClientes", new { IdEmpleado }, transaction,
                    commandType: CommandType.StoredProcedure);

                // - Eliminando en la tabla Personas:
                connection.Execute("dbo.EliminarPersonas", new { IdEmpleado }, transaction,
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
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTUALIZAR Empleado):
        public void ActualizarEmpleado(Empleado empleado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Actualizar en la tabla Persona:
                connection.Execute("dbo.ActualizarPersona", empleado.Persona, transaction,
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

    }
}
