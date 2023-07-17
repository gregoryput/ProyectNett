using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class EmpresaRepositorio : IEmpresaRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public EmpresaRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<EmpresaDTO> GetEmpresasByIdCliente(int ClienteId)
        {
            string query = "dbo.GetEmpresasByClienteId";

            var resultSet = _conexionDB.GetConnection(_configuration).Query< EmpresaDTO>(query, new { ClienteId = ClienteId }, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }
    }
}
