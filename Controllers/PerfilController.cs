using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Perfil")]
    [ApiController]
    [Authorize]
    public class PerfilController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        private readonly InfoUserByToken _infoUser;

        public PerfilController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _usuarioRepositorio = new UsuarioRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }

        [Authorize]
        [Route("InfoPerfil")]
        [HttpGet]
        public IActionResult GetInfoPerfil(int idUsuario)
        {
            try
            {
                var objectInfoPerfil = _usuarioRepositorio.GetInfoPerfil(idUsuario);
                _respuesta.Result = new { objectInfoPerfil, objectInfoPerfil.Cargos };
                _respuesta.DisplayMessage = "Información de perfíl obtenida con éxito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la información del usuario";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
