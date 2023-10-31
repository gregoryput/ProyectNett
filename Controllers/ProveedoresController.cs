using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Proveedores")]
    [ApiController]
    [Authorize]
    public class ProveedoresController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IProveedorRepositorio _proveedorRepositorio;
        private readonly InfoUserByToken _infoUser;
        public ProveedoresController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _proveedorRepositorio = new ProveedorRepositorio(_configuration);
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Proveedores: --------------------------------------------
        [Authorize]
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
        // .A.C.C.I.O.N -- Para obtener la informacion del proveedor: --------------------------------------------
        [Authorize]
        [Route("obtenerInfoPersonalProveedor")]
        [HttpGet]
        public IActionResult getInfoPersonal(int IdProveedor)
        {
            try
            {
                var info = _proveedorRepositorio.GetInfoPersonalProveedor(IdProveedor);
                _respuesta.Result = info;
                _respuesta.DisplayMessage = "Info del proveedor obtenida con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la info del proveedor";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para insertar Proveedor: --------------------------------------------
        [Route("insertarProveedores")]
        [HttpPost]
        [Authorize]
        public IActionResult insertarProveedor(Proveedor proveedor)
        {

            string token = HttpContext.Request.Headers["Authorization"];
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
        [Authorize]
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


        // .A.C.C.I.O.N -- Para Activar proveedor: --------------------------------------------
        [Authorize]
        [Route("activarProveedor")]
        [HttpPost]
        public IActionResult activarProveedor(int IdProveedor)
        {
            try
            {

                _proveedorRepositorio.ActivarProveedor(IdProveedor);
                _respuesta.Result = IdProveedor;
                _respuesta.DisplayMessage = "Proveedor activado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al activar el Proveedor";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }

        // .A.C.C.I.O.N -- Para Actualizar proveedor: --------------------------------------------
        [Authorize]
        [Route("actualizarProveedor")]
        [HttpPost]
        public IActionResult actualizarProveedor(Proveedor proveedor)
        {
            try
            {
                _proveedorRepositorio.ActualizarProveedor(proveedor);
                _respuesta.Result = proveedor;
                _respuesta.DisplayMessage = "Proveedor editado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al actualizar el Proveedor";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }

            return Ok(_respuesta);
        }


    }

   


   
}
