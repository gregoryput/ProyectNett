using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public UsuarioRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public UsuarioDTO GetUsuarioLogin(string NombreUsuario, string Contraseña)
        {
            UsuarioDTO usuario = _conexionDB.GetConnection(_configuration).QueryFirstOrDefault<UsuarioDTO>("dbo.GetUsuarioLogin",
                new { NombreUsuario, Contraseña },
                commandType: CommandType.StoredProcedure);

            return usuario;
        }
    }
}
