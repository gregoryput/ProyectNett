using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
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
        private readonly IClienteRepositorio _clienteRepositorio;
         
        public ClientesController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _clienteRepositorio = new ClienteRepositorio(_configuration);
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Clientes: --------------------------------------------
        [Route("obtenerClientes")]
        [HttpGet]
        public IActionResult getClientes()
        {
            try
            {
                var listaClientes = _clienteRepositorio.GetClientes();
                _respuesta.Result = listaClientes;
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


        //
        // .A.C.C.I.O.N -- Para insertar Cliente: --------------------------------------------
        [Route("insertarClientes")]
        [HttpPost]
        public IActionResult insertarCliente(Cliente cliente)
        {
            try
            {
                _clienteRepositorio.InsertarCliente(cliente);
                _respuesta.Result = cliente;
                _respuesta.DisplayMessage = "Cliente insertado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el cliente";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }


        //
        // .A.C.C.I.O.N -- Para eliminar Cliente: --------------------------------------------
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
