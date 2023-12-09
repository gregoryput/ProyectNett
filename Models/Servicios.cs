using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{  
   public class Servicios
    {
        [Key]
        public int IdServicio { get; set; }
        public string NombreServicio { get; set; }
        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }

    }
}
