using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IProductoRepositorio
    {
        public IEnumerable<ProductoDTO> GetProductos();
        public OrdenCompraDTO GetOrdenCompraById(int OrdenId);
        public IEnumerable<ProductoDTO> GetProductosParaFC();
        public void InsertarProducto(ProductoINV producto);
        public void CrearOrdenCompra(OrdenCompra ordenCompra);

        public void AprobarOrdenCmpra(int OrdenId);
        public IEnumerable<ProductoInfoBasicaDTO> GetListaProductosInfoInv();
    }
}
