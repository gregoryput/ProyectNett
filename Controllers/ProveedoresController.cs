using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Proveedores")]
    [ApiController]
    public class ProveedoresController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IProveedorRepositorio _proveedorRepositorio;

        public ProveedoresController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _proveedorRepositorio = new ProveedorRepositorio(_configuration);
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Proveedores: --------------------------------------------
        [Route("obtenerProveedores")]
        [HttpGet]
        public IActionResult getProveedores()
        {
            try
            {
                var listaEmpleados = _proveedorRepositorio.GetProveedores();
                _respuesta.Result = listaEmpleados;
                _respuesta.DisplayMessage = "Listado de proveedores obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de proveedores";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }


        //
        // .A.C.C.I.O.N -- Para insertar Proveedor: --------------------------------------------
        [Route("insertarProveedores")]
        [HttpPost]
        public IActionResult insertarCliente(Proveedor proveedor)
        {
            try
            {
                _proveedorRepositorio.InsertarProveedor(proveedor);
                _respuesta.Result = proveedor;
                _respuesta.DisplayMessage = "Proveedor insertado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el proveedor";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }



        //
        // .A.C.C.I.O.N -- Para eliminar Proveedor: --------------------------------------------
        [Route("eliminarProveedores")]
        [HttpPost]
        public IActionResult eliminarProveedor(int IdProveedor)
        {
            try
            {
                _proveedorRepositorio.EliminarProveedor(IdProveedor);
                _respuesta.Result = IdProveedor;
                _respuesta.DisplayMessage = "Proveedor eliminado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al eliminar el proveedor";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }
    }
}
