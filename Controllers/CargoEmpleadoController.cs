using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Cargos")]
    [ApiController]
    //[Authorize]
    public class CargoEmpleadoController : Controller
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly ICargoEmpleado _cargoEmpleadoRepositorio;

        public CargoEmpleadoController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _cargoEmpleadoRepositorio = new CargoEmpleadoRepositorio(_configuration);
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista de Cargo: --------------------------------------------
        [Authorize]
        [Route("ObtenerCargo")]
        [HttpGet]
        public IActionResult getCargo()
        {
            try
            {
                var cargo = _cargoEmpleadoRepositorio.GetCargo();
                _respuesta.Result = cargo;
                _respuesta.DisplayMessage = "Cargos  obtenidas correctamente:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de cargo";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista de Empresas por ClienteId: --------------------------------------------
        [Authorize]
        [Route("CargoPorEmpleadoId")]
        [HttpGet]
        public IActionResult getEmpleadoId(int IdEmpleado, int estadoId)
        {
            try
            {
                var empresas = _cargoEmpleadoRepositorio.GetCargoByIdEmpleado(IdEmpleado, estadoId);
                _respuesta.Result = empresas;
                _respuesta.DisplayMessage = "Cargo del Empleado obtenidas correctamente:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de Cargo";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
