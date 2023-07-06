using ProyectNettApi.Models;
using System.IdentityModel.Tokens.Jwt;

namespace ProyectNettApi.Repositories
{
    public class InfoUserByToken
    {
        public int getUsuarioIdByToken(string token) {
            // Decodificar el token
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token.Replace("Bearer ", ""));

            // Obtener los datos del usuario desde los claims del token
            int IdUsuario = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "IdUsuario")?.Value);

            return IdUsuario;
        }
    }
}
