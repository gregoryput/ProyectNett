using Dapper;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;

namespace ProyectNettApi.Repositories
{
    public class SexoRepositorio : ISexoRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public SexoRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<Sexo> GetSexos()
        {
            string query = "Select * From Sexos";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<Sexo>(query);
            return resultSet.ToList();
        }
    }
}
