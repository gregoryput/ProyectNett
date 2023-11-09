namespace ProyectNettApi.DTO
{
    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Contraseña { get; set; }
        public string Correo { get; set; }
        public string NombreRol { get; set; }
        public string NombreEstado { get; set; }
        public int IdEstadoRegistro { get; set; }
        public int IdEmpleado { get; set; }
        public int IdRol { get; set; }

        public string Empleado { get; set;}
    }
}
