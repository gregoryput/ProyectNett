namespace ProyectNettApi.Models
{
    public class PersonaTipoPersona
    {
        public int IdPersonaTipoPersona { get; set; }
        public int IdPersona { get; set; }
        public int IdTipoPersona { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }
}
