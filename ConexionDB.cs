using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ProyectNettApi
{
    public class ConexionDB
    {
        // --------------------- METODO Para obtener la conexion -------------------------------
        protected SqlConnection GetConnection(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("BD_ProyeNett");
            var connection = new SqlConnection(connectionString);
            return connection;
        }
    }
}
