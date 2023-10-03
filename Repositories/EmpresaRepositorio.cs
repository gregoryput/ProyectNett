﻿using Dapper;
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

        // Lista de empresas por cliente
        public IEnumerable<CargoDTO> GetCargo()
        {
            string query = "dbo.CargoEmpleadoVer";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<CargoDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }
    }

  
}
