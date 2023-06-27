using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;
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
            string Contraseña = data.Contraseña.ToString();

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
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: singIng
                );

            return new
            {
                success = true,
                message = "Sesion iniciada correctamente",
                result = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }
    }
}
