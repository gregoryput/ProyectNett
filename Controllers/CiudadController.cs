using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Ciudades")]
    [ApiController]
    [Authorize]
    public class CiudadController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly ICiudadRepositorio _ciudadRepositorio;

        public CiudadController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _ciudadRepositorio = new CiudadRepositorio(_configuration);
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista de Ciudades: --------------------------------------------
        [Route("obtenerCiudades")]
        [HttpGet]
        public IActionResult getClientes()
        {
            try
            {
                var listaCiudades = _ciudadRepositorio.getCities();
                _respuesta.Result = listaCiudades;
                _respuesta.DisplayMessage = "Listado de ciudades obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de ciudades";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
