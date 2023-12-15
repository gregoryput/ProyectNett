using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Empleado
    {

        [Key]
        public int IdEmpleado { get; set; }

        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechadDeContratacion { get; set; }
        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }

        //[Required(ErrorMessage = "Este campo es requerido")]
        public Persona2 Persona { get; set; }

        public List<EmpleadoCargo> Cargos { get; set; }

    }
}
