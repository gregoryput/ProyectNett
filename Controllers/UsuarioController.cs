using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;
using ProyectNettApi.Segurity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProyectNettApi.Controllers
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        public UsuarioController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _usuarioRepositorio = new UsuarioRepositorio(_configuration);
        }




        [Route("login")]
        [HttpPost]
        public dynamic IniciarSesion([FromBody] Object usuarioData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(usuarioData.ToString());

            string NombreUsuario = data.NombreUsuario.ToString();
            string Contraseña = Segurity.Segurity.HashPassword(data.Contraseña.ToString());
            var resultSetDataUser = _usuarioRepositorio.GetUsuarioLogin(NombreUsuario, Contraseña);

            if (resultSetDataUser?.NombreUsuario == null)
            {
                return new
                {
                    success = false,
                    message = "Nombre de usuario o contrasena incorrecta",
                    result = ""
                };
            }

            var conf = _configuration;
            var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("IdUsuario", resultSetDataUser.IdUsuario.ToString()),
                new Claim("NombreUsuario", resultSetDataUser.NombreUsuario),
                new Claim("NombreRol", resultSetDataUser.NombreRol),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
            var singIng = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                jwt.Issuer,
                jwt.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(40),
                signingCredentials: singIng
                );

            return new
            {
                success = true,
                message = "Sesion iniciada correctamente",
                result = new JwtSecurityTokenHandler().WriteToken(token)
            };




        }
        // .A.C.C.I.O.N -- Para obtener la lista basica de Usuario: --------------------------------------------
        //[Authorize]
        [Route("obtenerUsuario")]
        [HttpGet]
        public IActionResult getUsuario()
        {
            try
            {
                var listaEmpleados = _usuarioRepositorio.getUsuario();
                _respuesta.Result = listaEmpleados;
                _respuesta.DisplayMessage = "Listado de usuario obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de usuarios";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);

        }

        // .A.C.C.I.O.N -- Para obtener la lista basica de Usuario: --------------------------------------------
        //[Authorize]
        [Route("obtenerEmpleado")]
        [HttpGet]
        public IActionResult getEmpleadoUsuario()
        {
            try
            {
                var listaEmpleados = _usuarioRepositorio.GetEmpleadoParaUsuario();
                _respuesta.Result = listaEmpleados;
                _respuesta.DisplayMessage = "Listado de empleado obtenido con exito:";
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de empleado";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);

        }

        //
        // .A.C.C.I.O.N -- Para insertar Usuario: --------------------------------------------
        //[Authorize]
        [Route("insertarUsuario")]
        [HttpPost]
        public IActionResult insertarUsuario(Usuario usuario)
        {
           
            try
            {
                 var resultado  = _usuarioRepositorio.InsertarUsuario(usuario);
                _respuesta.Result = resultado;
                _respuesta.DisplayMessage = "Usuario insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el Usuario";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para insertar Usuario: --------------------------------------------
        //[Authorize]
        [Route("ActualizarUsuario")]
        [HttpPost]
        public IActionResult ActualizarUsuario(Usuario usuario)
        {

            try
            {
                _usuarioRepositorio.ActualizarUsuario(usuario);
                _respuesta.Result = usuario;
                _respuesta.DisplayMessage = "Usuario insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el Usuario";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //
        // .A.C.C.I.O.N -- Para eliminar Usuario: --------------------------------------------
        //[Authorize]
        [Route("eliminarUsuario")]
        [HttpPost]
        public IActionResult eliminarUsuario(int IdUsuario)
        {
            try
            {
                _usuarioRepositorio.EliminarUsuario(IdUsuario);
                _respuesta.Result = IdUsuario;
                _respuesta.DisplayMessage = "Usuario eliminado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al eliminar el Usuario";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }


        //
        // .A.C.C.I.O.N -- Para Activar Usuario: --------------------------------------------
        //[Authorize]
        [Route("activarUsuario")]
        [HttpPost]
        public IActionResult activarUsuario(int IdUsuario)
        {
            try
            {
                _usuarioRepositorio.ActivarUsuario(IdUsuario);
                _respuesta.Result = IdUsuario;
                _respuesta.DisplayMessage = "Usuario activado correctamente:";
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al activar el Usuario";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_respuesta);
        }


    }
}
