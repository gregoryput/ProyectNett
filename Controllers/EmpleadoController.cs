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

        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Empleados: --------------------------------------------
        [Authorize]
        [Route("obtenerEmpleados")]
        [HttpGet]
        public IActionResult getEmpleados(int pageNumber, int pageSize)
        {
            try
            {
                var (listaEmpleados, totalCount) = _empleadoRepositorio.GetEmpleados(pageNumber, pageSize);

                // Calcular el número total de páginas
                int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                _respuesta.Result = listaEmpleados;
                _respuesta.TotalItems = totalCount;
                _respuesta.TotalPages = totalPages;
                _respuesta.CurrentPage = pageNumber;
                _respuesta.PageSize = pageSize;
                _respuesta.DisplayMessage = "Listado de empleados obtenido con éxito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de empleados";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


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
        // .A.C.C.I.O.N -- Para eliminar Empleado: --------------------------------------------
        [Authorize]
        [Route("eliminarCliente")]
        [HttpPost]
        public IActionResult eliminarCliente(int IdCliente)
        {
            try
            {
                _empleadoRepositorio.EliminarEmpleado(IdCliente);
                _respuesta.Result = IdCliente;
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
    }

}
