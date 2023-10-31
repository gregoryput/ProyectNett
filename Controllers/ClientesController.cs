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
        public IActionResult getClientes()
        {
            try
            {
                var listaClientes = _clienteRepositorio.GetClientes();
                _respuesta.Result = listaClientes;
                _respuesta.DisplayMessage = "Listado de clientes obtenido con exito:";
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
        // .A.C.C.I.O.N -- Para obtener la informacion del cliente: --------------------------------------------
        [Authorize]
        [Route("obtenerInfoPersonal")]
        [HttpGet]
        public IActionResult getInfoPersonal(int IdCliente)
        {
            try
            {
                var infoCliente = _clienteRepositorio.GetInfoPersonalCliente(IdCliente);
                _respuesta.Result = infoCliente;
                _respuesta.DisplayMessage = "Info del cliente obtenida con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la info del cliente";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }




        //
        // .A.C.C.I.O.N -- Para obtener la lista basica PAGINADA (DEPRECATED) de Clientes: --------------------------------------------
        [Authorize]
        [Route("obtenerClientesPag")]
        [HttpGet]
        public IActionResult getClientesPag(int pageNumber, int pageSize)
        {
            try
            {
                var (listaClientes, totalCount) = _clienteRepositorio.GetClientesPag(pageNumber, pageSize);

                // Calcular el número total de páginas
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
                _respuesta.Result = listaClientes;
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
        // .A.C.C.I.O.N -- Para Activar Cliente: --------------------------------------------
        [Authorize]
        [Route("activarCliente")]
        [HttpPost]
        public IActionResult activarCliente(int IdCliente)
        {
            try
            {
                _clienteRepositorio.ActivarCliente(IdCliente);
                _respuesta.Result = IdCliente;
                _respuesta.DisplayMessage = "Cliente activado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al activar el cliente";
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
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al actualizar el cliente";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }

            return Ok(_respuesta);
        }
    }
}
