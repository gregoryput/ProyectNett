using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Entidades")]
    [ApiController]
    [Authorize]
    public class EntidadesController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IEntidadRepositorio _entidadRepositorio;
        private readonly InfoUserByToken _infoUser;

        public EntidadesController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _entidadRepositorio = new EntidadRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }

        //
        // .A.C.C.I.O.N -- Para insertar Entidades: --------------------------------------------  --------------------------------------------  -------------------------------------------- 
        [Authorize]
        [Route("InsertarEntidad")]
        [HttpPost]
        public IActionResult InsertarEntidad(Entidad entidad)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            entidad.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _entidadRepositorio.InsertarEntidad(entidad);
                _respuesta.Result = entidad;
                _respuesta.DisplayMessage = "Entidad cliente insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar la entidad";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
