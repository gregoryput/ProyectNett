using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("UQVerificar")]
    [ApiController]
    [Authorize]
    public class UQVerificarController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IUQExisteRepositorio _uQExisteRepositorio;

        public UQVerificarController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _uQExisteRepositorio = new UQExisteRepositorio(_configuration);
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista de Paises: --------------------------------------------
        [Route("verificarCedula")]
        [HttpGet]
        public IActionResult uqVerificarCedula(string cedula)
        {
            try
            {
                var listaPaises = _uQExisteRepositorio.VerificarUQCedulaNoModel(cedula);
                _respuesta.Result = listaPaises;
                _respuesta.DisplayMessage = "Verificacion de cedula realizada correctamente:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al realizar la verificacion de cedula";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
