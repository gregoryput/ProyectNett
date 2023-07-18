using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class EmpleadoCargo
    {
        [Key]
        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdCargo { get; set; }
        public string Descripción { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdModificadoPor { get; set; }
        public DateTime FechaModificacion { get; set; }
        public int IdEstadoRegistro { get; set; }
    }
}
