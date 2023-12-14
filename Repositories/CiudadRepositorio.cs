using Dapper;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;

namespace ProyectNettApi.Repositories
{
    public class CiudadRepositorio : ICiudadRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public CiudadRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<Ciudad> getCities(int idPais)
        {
            string queryExecute = $"Select * From Ciudades WHERE IdPais = {idPais}";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<Ciudad>(queryExecute);
            return resultSet.ToList();
        }

        public IEnumerable<Ciudad> getCiti()
        {
            string queryExecute = $"Select * From Ciudades";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<Ciudad>(queryExecute);
            return resultSet.ToList();
        }

        public void InsertarCiudad(Ciudad ciudad)
        {
            throw new NotImplementedException();
        }
    }
}
