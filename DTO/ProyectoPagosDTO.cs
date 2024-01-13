using System.Text.Json.Serialization;

namespace ProyectNettApi.DTO
{
    public class ObtenerDatosProcesarPagosProyectoDTO
    {
        public DateTime FechaDeEmision { get; set; }
        public decimal MontoInicial { get; set; }
        public DateTime FechaDeVencimiento { get; set; }
        public DateTime FechaVencimientoNCF { get; set; }
        public int CantidadCuotas { get; set; }
        public decimal PorcientoMora { get; set; }
        public int DiaPagoMensual { get; set; }
        public int DiasParaVencimiento { get; set; }
        public string NombrePlazo { get; set; }
        public decimal MontoTotal { get; set; }
        public int TipoNCFId { get; set; }
        public string Secuencia { get; set; }
       
      

        [JsonIgnore]
        public string CuotaProyectoJson { get; set; }

        public List<CuotaProyectoDTO> LCuotaProyectoDTO { get; set; }

        public decimal TotalServicio { get; set; }
        public decimal TotalProducto { get; set; }
        public decimal TotalGasto { get; set; }
    }



    public class CuotaProyectoDTO
    {
        public int IdDistribucionPago { get; set; }
        public int IdFactura { get; set; }
        public int CuotaNumero { get; set; }
        public decimal MontoAPagar { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public bool SePago { get; set; }
    }

}
