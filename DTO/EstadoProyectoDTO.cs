using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.DTO
{
    public class EstadoProyectoDTO
    {
        [Key]
        public int IdEstado { get; set; }
        public string ? EstadoNombre { get; set; }

    }
}
