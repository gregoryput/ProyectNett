using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;

namespace ProyectNettApi.Repositories
{
    public class UnidadMedidaRepositorio : IUnidadMedidaRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public UnidadMedidaRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<UnidadesMedidaDTO> GetUnidadesMedida()
        {
            string query = "EXECUTE dbo.ObtenerUnidadesMedida";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<UnidadesMedidaDTO>(query);
            return resultSet.ToList();
        }
    }
}
