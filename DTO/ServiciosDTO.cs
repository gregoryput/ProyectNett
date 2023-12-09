using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.DTO
{
    public class ServiciosDTO
    {
        [Key]
        public int IdServicio { get; set; }
        public string ? NombreServicio { get; set; }
    }
}
