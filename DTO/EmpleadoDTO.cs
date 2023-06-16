namespace ProyectNettApi.DTO
{
    public class EmpleadoDTO
    {
        public int IdCliente { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string Direccion { get; set; }
        public string Correo { get; set; }
        public int Edad { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public string Cedula { get; set; }
        public string SexoNombre { get; set; }
        public string CiudadNombre { get; set; }
        public string PaisNombre { get; set; }
    }
}
