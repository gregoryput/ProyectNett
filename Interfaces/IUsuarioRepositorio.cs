using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IUsuarioRepositorio
    {
        public UsuarioDTO GetUsuarioLogin(string NombreUsuario, string Contraseña);
        public InfoPerfilDTO GetInfoPerfil(int usuarioId);
        public IEnumerable<UsuarioDTO> getUsuario();
        public IEnumerable<EmpleadoDTO2> GetEmpleadoParaUsuario();
        public string InsertarUsuario(Usuario usuario);
        public void ActualizarUsuario(Usuario usuario);
        public void ActivarUsuario(int IdUsuario);
        public void EliminarUsuario(int IdUsuario);
    }
}
