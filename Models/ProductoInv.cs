namespace ProyectNettApi.Models
{
    using System;
    public class ProductoINV
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Modelo { get; set; }
        public bool TieneVencimiento { get; set; }
        public int? IdEstado { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }

        // ---
        public List<ProdutoDetalleUnidadMedidaDetalle>? ProductoUnidadesMedidaDetalles { get; set; }

        // ---
        public DataImagenProducto? DataImagenProducto { get; set; }
    }


    public class ProdutoDetalleUnidadMedidaDetalle
    {
        public ProductoUnidadDeMedida ProductoUnidadDeMedida { get; set; }

        public DetalleProductoUnidadDeMedida DetalleProductoUnidadDeMedida { get; set; }
    }


    // Clase que representa la tabla ProductosUnidadesDeMedida
    public class ProductoUnidadDeMedida
    {
        public int IdProductoUnidadDeMedida { get; set; }
        public int IdUnidadDeMedida { get; set; }
        public int IdProducto { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

    public class DetalleProductoUnidadDeMedida
    {
        public int IdProducto { get; set; }
        public int IdUnidadDeMedida { get; set; }
        public decimal PrecioCosto { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal ITBIS { get; set; }
        public int IdProductoUnidadDeMedida { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

}
