using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IProveedorRepositorio
    {
        public IEnumerable<ProveedorDTO> GetProveedores();
        public void InsertarProveedor(Proveedor proveedor);
        public void EliminarProveedor(int IdProveedor);
        public void ActualizarProveedor(Proveedor proveedor);
    }
}
