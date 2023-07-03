using Dapper;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;

namespace ProyectNettApi.Repositories
{
    public class CountryRepositorio : IPaisRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public CountryRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<Pais> getCountries()
        {
            string queryExecuteProcedure = "Select * From Paises";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<Pais>(queryExecuteProcedure);
            return resultSet.ToList();
        }

        public void InsertarPais(Pais pais)
        {
            throw new NotImplementedException();
        }
    }
}
