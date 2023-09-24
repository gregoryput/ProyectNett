using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }

        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public Persona Persona { get; set; }

        public List<Empresa>? Empresas { get; set; }
    }
}

