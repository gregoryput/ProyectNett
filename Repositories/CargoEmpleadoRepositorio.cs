using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{

    public class CargoEmpleadoRepositorio : ICargoEmpleado
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public CargoEmpleadoRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        // Lista 
        public IEnumerable<CargoDTO> GetCargo()
        {
            string query = "dbo.CargoEmpleadoVer";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<CargoDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        // Lista de cargo por empleado
        public IEnumerable<CargoEmpleadoDTO> GetCargoByIdEmpleado(int IdEmpleado, int EstadoId)
        {
            string query = "dbo.GetCargoEmpleados";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<CargoEmpleadoDTO>(query, new { IdEmpleado = IdEmpleado, EstadoId = EstadoId }, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }
    }
   
}
