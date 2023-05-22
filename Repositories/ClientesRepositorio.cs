using Dapper;
using Microsoft.Data.SqlClient;
using ProyectNettApi.DTO;
using ProyectNettApi.Models;
using System.Data.Common;

namespace ProyectNettApi.Repositories
{
    public class ClientesRepositorio 
    {
        private readonly IConfiguration _configuration;

        public ClientesRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // --------------------- METODO Para obtener la conexion -------------------------------
        private SqlConnection GetConnection()
        {
            var connectionString = _configuration.GetConnectionString("BD_PROYENETT_VP3");
            var connection = new SqlConnection(connectionString);
            return connection;
        }


        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------(Metodo para devolver una lista de clientes):
        public IEnumerable<ClienteDTO> getClientes()
        {
            string query = "Execute dbo.ListadoClientes";
            var resultSet = GetConnection().Query<ClienteDTO>(query);
            return resultSet.ToList();
        }

    }
}
