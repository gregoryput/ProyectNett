using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Empresas")]
    [ApiController]
    [Authorize]
    public class EmpresaController : Controller
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IEmpresaRepositorio _empresaRepositorio;

        public EmpresaController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _empresaRepositorio = new EmpresaRepositorio(_configuration);
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista de Empresas por ClienteId: --------------------------------------------
        [Authorize]
        [Route("EmpresasPorClienteId")]
        [HttpGet]
        public IActionResult getClientes(int clienteId, int estadoId)
        {
            try
            {
                var empresas = _empresaRepositorio.GetEmpresasByIdCliente(clienteId, estadoId);
                _respuesta.Result = empresas;
                _respuesta.DisplayMessage = "Empresas del cliente obtenidas correctamente:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de empresas";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
