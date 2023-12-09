using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class EstadoProyecto
    {
        [Key]
        public int IdEstado { get; set; }
        public string EstadoNombre { get; set; }

        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }
    }
}
