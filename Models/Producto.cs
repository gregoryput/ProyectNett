namespace ProyectNettApi.Models
{
    public class Producto
    {
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public string Descripción { get; set; }
        public string Modelo { get; set; }
        public decimal PrecioCosto { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal ITBIS { get; set; }
        public int IdUnidad_DeMedida { get; set; }
        public int IdEstado { get; set; }
        public int IdCreadoPor { get; set; }
        public int IdEstadoRegistro { get; set; }
        public int IdModificadoPor { get; set; }
    }
}