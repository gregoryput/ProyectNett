using System.Text.Json.Serialization;

namespace ProyectNettApi.DTO
{
    public class ProyectoDTO
    {
        public int IdProyecto { get; set; }
        public string NombreProyecto { get; set; }
        public int TotalTareas { get; set; }
        public int TareasCompletas { get; set; }
        public int PorcentajeCompletado { get; set; }

    }
    public class GastoDTO
    {
        public string DescripcionGasto { get; set; }
        public decimal MontoGasto { get; set; }
    }
    public class ListaTareaDTO
    {
  
        public int? IdTarea { get; set; }
        public int? IdEstadoTarea { get; set; }

        public string? NombreTarea { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public DateTime? FechaRealDeFinalizacion { get; set; }
        public int IdServicio { get; set; }
        public string TiempDuracionEstimado { get; set; }

        public string NombreServicio { get; set; }
        public string Descripcion { get; set; }
        public string EstadoTarea { get; set; }
        public int? IdPrioridad { get; set; }
        public DateTime? FechaInicio { get; set; }
        public string? NombreParametro { get; set; }
        public decimal? CostoPorParametro { get; set; }
        public int? Cantidad { get; set; }
        public decimal  ? CostoTotal { get; set; }
        public string? NombrePrioridad { get; set; }
        public string? NombreEstado { get; set; }
    }
    public class ListaServicioDTO
    {
        public int IdServicio { get; set; }
        public string NombreServicio { get; set; }
       
    }

    public class ListaProductoDTO
    {
        public int Cantidad { get; set; }
        public string NombreProducto { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal ITBIS { get; set; }
        public decimal Subtotal { get; set; }
     
    }

    public class ListaEmpleadoDTO
    {
        public string ResponsabilidadNombre { get; set; }
        public int IdResponsabilidad { get; set; }
        public int IdEmpleado { get; set; }
        public int IdPersonaProyecto { get; set; }
        public string NombreEmpleado { get; set; }
    }

    public class ListaProyectoDTO
    {
        public int IdProyecto { get; set; }
        public int PorcentajeCompletado { get; set; }
        public string NombreEntidad { get; set; }
        public string NombreTipoEntidad { get; set; }
        public string NombreProyecto { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaDeInicio { get; set; }
        public DateTime FechaDeFinalizacion { get; set; }
        public decimal PresupuestoAcordado { get; set; }
        public string EstadoProyecto { get; set; }
        public decimal TotalTarea { get; set; }
        public decimal TotalProducto { get; set; }
        public decimal TotalGasto { get; set; }
        public decimal MontoInicial { get; set; }


        [JsonIgnore]
        public string TareasProyectoJson { get; set; }
        [JsonIgnore]

        public string ProductosProyectoJson { get; set; }
        [JsonIgnore]

        public string ServicioProyectoJson { get; set; }
        [JsonIgnore]

        public string GastoProyectoJson { get; set; }
        [JsonIgnore]
        public string EmpleadosProyectoJson { get; set; }
        public List<ListaTareaDTO> TareasProyecto { get; set; }
        public List<ListaProductoDTO> ProductosProyecto { get; set; }
        public List<ListaServicioDTO> ServicioProyecto { get; set; }
        public List<ListaEmpleadoDTO> EmpleadosProyecto { get; set; }
        public List<GastoDTO> GastoProyecto { get; set; }
    }

}