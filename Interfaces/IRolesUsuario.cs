using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.DTO;

namespace ProyectNettApi.Interfaces
{
    public interface IRolesUsuario
    {
        public IEnumerable<RolesUsuarioDTO> GetRoles();
    }
}