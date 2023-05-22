namespace ProyectNettApi.DTO
{
    public class ClienteDTO
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
        public string NombreSexo { get; set; }
        public string NombreEmpresa { get; set; }
    }
}
