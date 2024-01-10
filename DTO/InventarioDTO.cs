using ProyectNettApi.Models;
using System.Text.Json.Serialization;

namespace ProyectNettApi.DTO
{
    // Clase para representar la información de existencias de un producto
    public class ProductoExistenciaDTO
    {
        public int IdUnidadDeMedida { get; set; }
        public decimal PrecioCosto { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal ITBIS { get; set; }
        public string UnidadNombre { get; set; }
        public int CantidadExistente { get; set; }
    }

    public class ProductoInfoBasicaResultProcedure
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Modelo { get; set; }
        public bool TieneVencimiento { get; set; }
        public int IdEstado { get; set; }
        public string EstadoNombreProducto { get; set; }
        public int IdEstadoRegistro { get; set; }
        public string NombreEstado { get; set; }
        public string? ContentType { get; set; }
        public string? Data { get; set; }

        [JsonIgnore]
        public string ProductosExistenciasJson { get; set; }
    }

    // Clase para representar la información básica de un producto con sus existencias
    public class ProductoInfoBasicaDTO
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Modelo { get; set; }
        public bool TieneVencimiento { get; set; }
        public int IdEstado { get; set; }
        public string EstadoNombreProducto { get; set; }
        public int IdEstadoRegistro { get; set; }
        public string NombreEstado { get; set; }
        public string? ContentType { get; set; }
        public string Data { get; set; }
        public List<ProductoExistenciaDTO> ProductoExistencias { get; set; }
        public List<ProdutoDetalleUnidadMedidaDetalle>? ProductoUnidadesMedidaDetalles { get; set; }
    }
}
