using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Clientes")]
    [ApiController]
    [Authorize]
    public class ClientesController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IClienteRepositorio _clienteRepositorio;
        private readonly InfoUserByToken _infoUser;

        public ClientesController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _clienteRepositorio = new ClienteRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Clientes: --------------------------------------------
        [Authorize]
        [Route("obtenerClientes")]
        [HttpGet]
        public IActionResult getClientes(int pageNumber, int pageSize)
        {
            try
            {
                var (listaClientes, totalCount) = _clienteRepositorio.GetClientes(pageNumber, pageSize);

                // Calcular el número total de páginas
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                _respuesta.Result = listaClientes;
                _respuesta.TotalItems = totalCount;
                _respuesta.TotalPages = totalPages;
                _respuesta.CurrentPage = pageNumber;
                _respuesta.PageSize = pageSize;
                _respuesta.DisplayMessage = "Listado de clientes obtenido con éxito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de clientes";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para insertar Cliente: --------------------------------------------
        [Authorize]
        [Route("insertarClientes")]
        [HttpPost]
        public IActionResult insertarCliente(Cliente cliente)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            cliente.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _clienteRepositorio.InsertarCliente(cliente);
                _respuesta.Result = cliente;
                _respuesta.DisplayMessage = "Cliente insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el cliente";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para eliminar Cliente: --------------------------------------------
        [Authorize]
        [Route("eliminarCliente")]
        [HttpPost]
        public IActionResult eliminarCliente(int IdCliente)
        {
            try
            {
                _clienteRepositorio.EliminarCliente(IdCliente);
                _respuesta.Result = IdCliente;
                _respuesta.DisplayMessage = "Cliente eliminado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al eliminar el cliente";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }


        //
        // .A.C.C.I.O.N -- Para Actualizar Cliente: --------------------------------------------
        [Authorize]
        [Route("actualizarCliente")]
        [HttpPost]
        public IActionResult actualizarClientes(Cliente cliente)
        {
            try
            {
                _clienteRepositorio.ActualizarCliente(cliente);
                _respuesta.Result = cliente;
                _respuesta.DisplayMessage = "Cliente editado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al editars el cliente";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
