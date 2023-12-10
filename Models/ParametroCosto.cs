namespace ProyectNettApi.Models
{
    public class ParametroCosto
    {
        public int IdParametroCosto { get; set; }
        public string NombreParametro { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdModificadoPor { get; set; }
        public DateTime FechaModificacion { get; set; }
        public int IdEstadoRegistro { get; set; }
    }
}
