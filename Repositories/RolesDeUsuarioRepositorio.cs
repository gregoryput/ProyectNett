using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class RolesDeUsuarioRepositorio : IRolesUsuario
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public RolesDeUsuarioRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        // Lista de roles de usuario
        public IEnumerable<RolesUsuarioDTO> GetRoles()
        {
            string query = "dbo.ListaRoles";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<RolesUsuarioDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

   


    }


}
