using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class UnidadDeMedidadcs
    {

        [Key]
        public int IdUnidad_DeMedida { get; set; }
        public string UnidadNombre { get; set; }

        public int IdCreadoPor { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int IdModificadoPor { get; set; }

        public DateTime FechaModificacion { get; set; }

        public int IdEstadoRegistro { get; set; }

    }
}
