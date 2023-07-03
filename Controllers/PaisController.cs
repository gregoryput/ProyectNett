using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Paises")]
    [ApiController]
    [Authorize]
    public class PaisController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IPaisRepositorio _paisRepositorio;

        public PaisController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _paisRepositorio = new CountryRepositorio(_configuration);
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista de Paises: --------------------------------------------
        [Route("ObtenerPaises")]
        [HttpGet]
        public IActionResult getClientes()
        {
            try
            {
                var listaPaises = _paisRepositorio.getCountries();
                _respuesta.Result = listaPaises;
                _respuesta.DisplayMessage = "Listado de paises obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de paises";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
