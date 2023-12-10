namespace ProyectNettApi.DTO
{

    public class ProductosInfoBasicDTO
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Modelo { get; set; }
        public bool TieneVencimiento { get; set; }
        public int IdEstado { get; set; }
        public string NombreEstado { get; set; }
    }

    public class ProyectoProductosDTO
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Modelo { get; set; }
        public bool TieneVencimiento { get; set; }
        public int IdEstado { get; set; }
        public string NombreEstado { get; set; }
        public List<DetalleProductoUnidadMedidaDTO> ProductoDetallesUnidades { get; set; }
    }

    public class DetalleProductoUnidadMedidaDTO
    {
        public int IdProductoUnidadDeMedida { get; set; }
        public int IdProducto { get; set; }
        public int IdUnidadDeMedida { get; set; }
        public string UnidadNombre { get; set; }
        public decimal PrecioCosto { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal ITBIS { get; set; }
    }
}
