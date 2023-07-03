using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Sexos")]
    [ApiController]
    [Authorize]
    public class SexoController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly ISexoRepositorio _sexoRepositorio;

        public SexoController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _sexoRepositorio = new SexoRepositorio(_configuration);
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Sexos: --------------------------------------------
        [Route("obtenerSexos")]
        [HttpGet]
        public IActionResult getSexos()
        {
            try
            {
                var listaClientes = _sexoRepositorio.GetSexos();
                _respuesta.Result = listaClientes;
                _respuesta.DisplayMessage = "Listado de sexos obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de sexos";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }

    }
}
