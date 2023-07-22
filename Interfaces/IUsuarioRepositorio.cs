using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IUsuarioRepositorio
    {
        public UsuarioDTO GetUsuarioLogin(string NombreUsuario, string Contraseña);
        public InfoPerfilDTO GetInfoPerfil(int usuarioId); 
    }
}
