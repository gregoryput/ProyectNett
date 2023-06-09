using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ProyectNettApi.Repositories
{
    public class ConexionDB
    {
        // -C-O-N-E-X-I-O-N--D-B---------- METODO Para obtener la conexion:
        public SqlConnection GetConnection(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("BD_PROYENETT");
            var connection = new SqlConnection(connectionString);
            return connection;
        }
    }
}
