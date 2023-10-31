using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IProveedorRepositorio
    {
        public void InsertarProveedor(Proveedor proveedor);
        public void EliminarProveedor(int IdProveedor);
        public void ActivarProveedor(int IdProveedor);
        public void ActualizarProveedor(Proveedor proveedor);
        public ProveedorDTO GetInfoPersonalProveedor(int IdProveedor);
        public IEnumerable<ProveedorDTO> GetProveedores();
    }
}
