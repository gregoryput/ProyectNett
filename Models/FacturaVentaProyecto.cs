namespace ProyectNettApi.Models
{
    public class FacturaVentaProyecto
    {
        public int IdFactura { get; set; }
        public DateTime? FechaDeEmision { get; set; }
        public decimal MontoInicial { get; set; }
        public DateTime? FechaVencimientoNCF { get; set; }
        public DateTime FechaDeVencimiento { get; set; }
        public decimal MontoTotal { get; set; }
        public int TipoNCFId { get; set; }
        public string Secuencia { get; set; }
        public int IdProyecto { get; set; }
        public int IdEstadoFactura { get; set; }
        // .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..
        public int CantidadCuotas { get; set; }
        public decimal PorcientoMora { get; set; }
        public int DiaPagoMensual { get; set; }
        public int DiasParaVencimiento { get; set; }
        public int IdTipoPlazo { get; set; }
        public List<DistribucionPago> DistribucionesPagos { get; set; }
        // .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }


    public class DistribucionPago
    {
        public int IdDistribucionPago { get; set; }
        public decimal MontoAPagar { get; set; }
        public int CuotaNumero { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public bool SePago { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }


    public class PagosFacturasVentas
    {
        public int IdPago { get; set; }
        public DateTime? Fecha { get; set; }
        public decimal? MontoPago { get; set; }
        public decimal? MontoMora { get; set; }
        public decimal? MontoTotal { get; set; }
        public DateTime? FechaPago { get; set; }
        public decimal? MontoEfectivo { get; set; }
        public decimal? DevolucionEfectivo { get; set; }
        public decimal? MontoTarjeta { get; set; }
        public string? Tarjeta { get; set; }
        public int? IdTipoPago { get; set; }
        public int? IdDistribucionPago { get; set; }

  
        public int IdEstadoRegistro { get; set; }


    }

    public class DataPagos
    {
        public List<PagosFacturasVentas> ListaPagos { get; set; }

    }


}
