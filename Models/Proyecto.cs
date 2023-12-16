namespace ProyectNettApi.Models
{
    public class Proyecto
    {
        public int IdProyecto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaDeInicio { get; set; }
        public DateTime FechaDeFinalizacion { get; set; }
        public string TiempoDuracionEstimado { get; set; }
        public DateTime? FechaRealDeFinalizacion { get; set; }
        public string? TiempoDuracionReal { get; set; }
        public decimal PresupuestoAcordado { get; set; }
        public bool ClienteEsPersonaFisica { get; set; }
        public int IdEntidad { get; set; }
        public int IdEstado { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public List<ProyectoDetalleProducto> ProyectoDetallesProductos { get; set; }
        public ProyectoEntidadParams ProyectoEntidadParams { get; set; }
        public List<ProyectoEmpleado> ProyectoEmpleados { get; set; }
        public List<GastoAdicional> GastoAdicionales { get; set; }
        public List<ProyectoServicio> ProyectoServicios { get; set; }
        public List<Tarea> ProyectoTareas { get; set; }
        public CotizacionProyecto CotizacionProyecto { get; set; }
    }

    public class ProyectoDetalleProducto
    {
        public int IdProyectoDetalleProducto { get; set; }
        public decimal Cantidad { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal ITBIS { get; set; }
        public string Codigo { get; set; }
        public decimal Descuento { get; set; }
        public decimal Subtotal { get; set; }
        public int IdProducto { get; set; }
        public int IdUnidadDeMedida { get; set; }
        public int IdProyecto { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }


    public class ProyectoEntidadParams
    {
        public int IdProyecto { get; set; }
        public int IdEntidad { get; set; }
    }

    public class ProyectoEmpleado
    {
        public int IdPersonaProyecto { get; set; }
        public int IdProyecto { get; set; }
        public int IdResponsabilidad { get; set; }
        public int IdEmpleado { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

    public class GastoAdicional
    {
        public int IdGasto { get; set; }
        public string DescripcionGasto { get; set; }
        public decimal MontoGasto { get; set; }
        public int IdProyecto { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

    public class ProyectoServicio
    {
        public int IdProyectoServicio { get; set; }
        public string Descripcion { get; set; }
        public int IdProyecto { get; set; }
        public int IdServicio { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

    public class Tarea
    {
        public int IdTarea { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinalizacion { get; set; }
        public string TiempDuracionEstimado { get; set; }
        public DateTime? FechaRealDeFinalizacion { get; set; }
        public string? TiempoDuracionReal { get; set; }

        public int ? IdParametroCosto { get; set; }
        public decimal? CostoPorParametro { get; set; }
        public decimal? Cantidad { get; set; }
        public decimal CostoTotal { get; set; }
        public int IdPrioridad { get; set; }
        public int IdProyecto { get; set; }
        public int IdEstado { get; set; }
        public int IdServicioRelacionado { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int IdEstadoRegistro { get; set; }
    }

    public class CotizacionProyecto
    {
        public int IdCotizacion { get; set; }
        public DateTime FechaDeEmision { get; set; }
        public decimal MontoInicial { get; set; }
        public decimal MontoTotal { get; set; }
        public string Secuencia { get; set; }
        public int IdCliente { get; set; }
        public int IdEstado { get; set; }
        public int IdProyecto { get; set; }
        public int IdEstadoCotizacion { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }
}
