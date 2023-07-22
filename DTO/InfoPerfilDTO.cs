namespace ProyectNettApi.DTO
{
    public class InfoPerfilDTO
    {
        public int IdEmpleado { get; set; }
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string NombreRol { get; set; }
        public int IdRol { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Cedula { get; set; }
        public string Direccion { get; set; }
        public int Edad { get; set; }
        public DateTime FechaDeNacimiento { get; set; }

        public List<CargoDTO> Cargos = new List<CargoDTO>();
    }
}
