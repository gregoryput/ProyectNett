using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("UnidadMedida")]
    [ApiController]
    [Authorize]
    public class UnidadMedidaController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IUnidadMedidaRepositorio _unidadMedidaRepositorio;

        public UnidadMedidaController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _unidadMedidaRepositorio = new UnidadMedidaRepositorio(_configuration);
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Unidades de Medida: --------------------------------------------
        [Route("obtenerUnidadesMedida")]
        [HttpGet]
        public IActionResult getUnidadesMedida()
        {
            try
            {
                var listaUnidades = _unidadMedidaRepositorio.GetUnidadesMedida();
                _respuesta.Result = listaUnidades;
                _respuesta.DisplayMessage = "Listado de unidades de medida obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de unidades de medida";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
