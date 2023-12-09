using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.DTO
{
    public class PrioridadDTO
    {
        [Key]
        public int IdPrioridad { get; set; }
        public string ? NombrePrioridad { get; set; }
    }
}
