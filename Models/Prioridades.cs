using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Prioridades
    {
        [Key]
        public int IdPrioridad { get; set; }
        public string ? NombrePrioridad { get; set; }

        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }

    }
}
