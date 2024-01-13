using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IEntidadRepositorio
    {
        public void InsertarEntidad(Entidad entidad);

        public IEnumerable<EntidadProveedor> getEntidadesProveedores();
    }
}
