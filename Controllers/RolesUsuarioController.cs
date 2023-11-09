using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("RolesDeUsuario")]
    [ApiController]
    //[Authorize]
    public class RolesUsuarioController : Controller
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IRolesUsuario _RolesUsuarioRepositorio;

        public RolesUsuarioController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _RolesUsuarioRepositorio = new RolesDeUsuarioRepositorio(_configuration);
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista de Cargo: --------------------------------------------
        //[Authorize]
        [Route("ObtenerCargo")]
        [HttpGet]
        public IActionResult getCargo()
        {
            try
            {
                var roles = _RolesUsuarioRepositorio.GetRoles();
                _respuesta.Result = roles;
                _respuesta.DisplayMessage = "Roles  obtenidas correctamente:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de roles";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

       
    }
}
