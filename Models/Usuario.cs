namespace ProyectNettApi.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string Constraseña { get; set; }
        public int IdRol { get; set; }
    }
}
