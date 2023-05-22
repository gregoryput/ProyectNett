using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly ClientesRepositorio _clientesRepositorio;
         
        public ClientesController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _clientesRepositorio = new ClientesRepositorio(_configuration);
        }


        [HttpGet]
        public IActionResult getClientes()
        {
            try
            {
                var listaEmpleados = _clientesRepositorio.getClientes();
                _respuesta.Result = listaEmpleados;
                _respuesta.DisplayMessage = "Listado de clientes obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de clientes";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
