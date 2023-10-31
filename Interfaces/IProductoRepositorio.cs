using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IProductoRepositorio
    {
        public IEnumerable<ProductoDTO> GetProductos();
        public IEnumerable<ProductoDTO> GetProductosParaFC();
        public void InsertarProducto(Producto cliente);
    }
}
