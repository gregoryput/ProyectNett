using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Proyecto")]
    [ApiController]
    //[Authorize]
    public class ProyectoController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IProyectoRespositorio _proyectoRepositorio;
        private readonly InfoUserByToken _infoUser;

        public ProyectoController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _proyectoRepositorio = new ProyectoRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }

        
        //[Authorize]
        [Route("obtenerClientes")]
        [HttpGet]
        public IActionResult getClientes()
        {
            try
            {
                var lista = _proyectoRepositorio.GetClienteProyecto();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerServicio")]
        [HttpGet]
        public IActionResult getServicio()
        {
            try
            {
                var lista = _proyectoRepositorio.GetServicio();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerUnidad")]
        [HttpGet]
        public IActionResult getUnidad()
        {
            try
            {
                var lista = _proyectoRepositorio.GetUnidades();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerEmpleado")]
        [HttpGet]
        public IActionResult getEmpleadoProyecto()
        {
            try
            {
                var lista = _proyectoRepositorio.GetEmpeleadoProyecto();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerResposabilidad")]
        [HttpGet]
        public IActionResult getResponsabilidad()
        {
            try
            {
                var lista = _proyectoRepositorio.GetResponsabilidad();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerPrioridad")]
        [HttpGet]
        public IActionResult getPrioridad()
        {
            try
            {
                var lista = _proyectoRepositorio.GetPrioridad();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

    }
}
