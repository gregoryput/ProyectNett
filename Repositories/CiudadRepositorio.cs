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

        public IEnumerable<Ciiudad> getCities(int idPais)
        {
            string queryExecute = $"Select * From Ciudades WHERE IdPais = {idPais}";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<Ciiudad>(queryExecute);
            return resultSet.ToList();
        }

        public IEnumerable<Ciiudad> getCiti()
        {
            string queryExecute = $"Select * From Ciudades";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<Ciiudad>(queryExecute);
            return resultSet.ToList();
        }

        public void InsertarCiudad(Ciiudad ciudad)
        {
            throw new NotImplementedException();
        }
    }
}
