using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Responsabilidades
    {
        [Key]
        public int IdResponsabilidad { get; set; }
        public string ResponsabilidadNombre { get; set; }

        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }
    }
}
