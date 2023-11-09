using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Empleados")]
    [ApiController]
    [Authorize]
    public class EmpleadoController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IEmpleadoRepositorio _empleadoRepositorio;
        private readonly InfoUserByToken _infoUser;

        public EmpleadoController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _empleadoRepositorio = new EmpleadoRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }


        // .A.C.C.I.O.N -- Para obtener la lista basica de Emepleado: --------------------------------------------
        [Authorize]
        [Route("obtenerEmpleado")]
        [HttpGet]
        public IActionResult getEmpleado()
        {
            try
            {
                var listaEmpleado = _empleadoRepositorio.GetEmpleado();
                _respuesta.Result = listaEmpleado;
                _respuesta.DisplayMessage = "Listado de empleado obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de Empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
   
        }

        //
        // .A.C.C.I.O.N -- Para obtener la informacion del empleado: --------------------------------------------
        [Authorize]
        [Route("obtenerInfoPersonal")]
        [HttpGet]
        public IActionResult getInfoPersonal(int IdEmpleado)
        {
            try
            {
                var info = _empleadoRepositorio.GetInfoPersonalEmpleado(IdEmpleado);
                _respuesta.Result = info;
                _respuesta.DisplayMessage = "Info del empleado obtenida con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la info del empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }






        //
        //// .A.C.C.I.O.N -- Para obtener la lista basica de Empleados:Con paginacion --------------------------------------------
        //[Authorize]
        //[Route("obtenerEmpleadosPag")]
        //[HttpGet]
        //public IActionResult getEmpleados(int pageNumber, int pageSize)
        //{
        //    try
        //    {
        //        var (listaEmpleados, totalCount) = _empleadoRepositorio.GetEmpleados(pageNumber, pageSize);

        //        // Calcular el número total de páginas
        //        int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

        //        _respuesta.Result = listaEmpleados;
        //        _respuesta.DisplayMessage = "Listado de empleados obtenido con éxito:";
        //        return Ok(_respuesta);
        //    }
        //    catch (Exception ex)
        //    {
        //        _respuesta.IsSuccess = false;
        //        _respuesta.DisplayMessage = "Error al solicitar la lista de empleados";
        //        _respuesta.ErrorMessages = new List<string> { ex.ToString() };
        //        return StatusCode(500, _respuesta);
        //    }
        //}


        //
        // .A.C.C.I.O.N -- Para insertar Empleados: --------------------------------------------
        [Authorize]
        [Route("insertarEmpleado")]
        [HttpPost]
        public IActionResult insertarEmpleado(Empleado empleado)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            empleado.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _empleadoRepositorio.InsertarEmpleado(empleado);
                _respuesta.Result = empleado;
                _respuesta.DisplayMessage = "Empleado insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar al empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //
        // .A.C.C.I.O.N -- Para Activar Cliente: --------------------------------------------
        [Authorize]
        [Route("activarEmpleado")]
        [HttpPost]
        public IActionResult activarEmpleado(int IdEmpleado)
        {
            try
            {
                _empleadoRepositorio.ActivarEmpleado(IdEmpleado);
                _respuesta.Result = IdEmpleado;
                _respuesta.DisplayMessage = "Empleado activado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al Activar el Empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }

        //
        // .A.C.C.I.O.N -- Para eliminar Empleado: --------------------------------------------
        [Authorize]
        [Route("eliminarEmpleado")]
        [HttpPost]
        public IActionResult eliminarEmpleado(int IdEmpleado)
        {
            try
            {
                _empleadoRepositorio.EliminarEmpleado(IdEmpleado);
                _respuesta.Result = IdEmpleado;
                _respuesta.DisplayMessage = "Empleado eliminado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al eliminar al empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }

        //
        // .A.C.C.I.O.N -- Para Actualizar Cliente: --------------------------------------------
        [Authorize]
        [Route("actualizarEmpleado")]
        [HttpPost]
        public IActionResult actualizar(Empleado c)
        {
            try
            {
                _empleadoRepositorio.ActualizarEmpleado(c);
                _respuesta.Result = c;
                _respuesta.DisplayMessage = "Empleado editado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al actualizar el Empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }

            return Ok(_respuesta);
        }
    }

}
