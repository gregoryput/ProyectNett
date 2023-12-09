using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.DTO
{
    public class ResponsabilidadesDTO
    {
        [Key]
        public int IdResponsabilidad { get; set; }
        public string ? ResponsabilidadNombre { get; set; }
    }
}
