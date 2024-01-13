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

        // ----
    }


    public class ProdutoDetalleUnidadMedidaDetalle
    {
        public ProductoUnidadDeMedida ProductoUnidadDeMedida { get; set; }

        public DetalleProductoUnidadDeMedida DetalleProductoUnidadDeMedida { get; set; }

        //public Existencia? Existencia { get; set; }
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

    public class Existencia
    {
        public int IdExistencia { get; set; }
        public string Descripcion { get; set; }
        public string Codigo { get; set; }
        public int CantidadExistente { get; set; }
        public int IdProducto { get; set; }
        public int IdUnidadMedida { get; set; }
        public int IdDetalleProductoUnidad { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }


    public class OrdenCompra
    {
        public int IdOrdenCompra { get; set; }
        public int IdEntidadProveedor { get; set; }
        public decimal MontoTotal { get; set; }
        public decimal MontoInicial { get; set; }
        public string Secuencia { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaEntrega { get; set; }
        public int IdCiudadEntrega { get; set; }
        public string DireccionEntrega { get; set; }
        public int IdEstadoDocumento { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
        public List<OrdenCompraDetalle> OrdenCompraDetalles { get; set; }

    }



    public class OrdenCompraDetalle
    {
        public int IdDetalleOrdenCompra { get; set; }
        public int IdProducto { get; set; }
        public int IdUnidadDeMedida { get; set; }
        public int IdOrdenCompra { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
        public decimal ITBIS { get; set; }
        public decimal Subtotal { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdModificadoPor { get; set; }
        public DateTime FechaModificacion { get; set; }
        public int IdEstadoRegistro { get; set; }

    }


    public class OrdenCompraDTO
    {
        public int IdOrdenCompra { get; set; }
        public int IdEntidadProveedor { get; set; }
        public decimal MontoTotal { get; set; }
        public string Secuencia { get; set; }
        public string NombreEntidad { get; set; } 
        public string NombreTipoEntidad { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaEntrega { get; set; }
        public int IdCiudadEntrega { get; set; }
        public string PaisNombre { get; set; }
        public string CiudadNombre { get; set; }
        public string DireccionEntrega { get; set; }
        public decimal MontoInicial { get; set; }
        public string NombreEstadoDocumeto { get; set; }
        public List<OrdenCompraDetalleDTO>? DetallesOrdenCompra { get; set; }
    }


    public class OrdenCompraDetalleDTO
    {
        public int IdDetalleOrdenCompra { get; set; }
        public int IdProducto { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public int IdUnidadDeMedida { get; set; }
        public string UnidadNombre { get; set; }
        public int IdOrdenCompra { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
        public decimal ITBIS { get; set; }
        public decimal Subtotal { get; set; }
    }

}
