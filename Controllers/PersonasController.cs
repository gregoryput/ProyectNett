using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Personas")]
    [ApiController]
    [Authorize]
    public class PersonasController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IPersonaRepositorio _personaRepositorio;
        private readonly InfoUserByToken _infoUser;

        public PersonasController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _personaRepositorio = new PersonaRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }

        //
        // .A.C.C.I.O.N -- Para insertar Persona: --------------------------------------------
        [Authorize]
        [Route("insertarPersona")]
        [HttpPost]
        public IActionResult insertarPersona(Persona persona)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            persona.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _personaRepositorio.InsertarPersona(persona);
                _respuesta.Result = new { IdPersona = persona.IdPersona, NombreCompleto = persona.Nombres + ' ' + persona.Apellidos };
                _respuesta.DisplayMessage = "Datos personales insertados correctamente";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar los datos personales";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para obtener la informacion persoal: --------------------------------------------
        [Authorize]
        [Route("GetPersonasInfoPersonal")]
        [HttpGet]
        public IActionResult getPersonasInfoPersonal()
        {
            try
            {
                var infoCliente = _personaRepositorio.GetPersonasInfoPersonal();
                _respuesta.Result = infoCliente;
                _respuesta.DisplayMessage = "Info personal obtenida con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la info personal";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
