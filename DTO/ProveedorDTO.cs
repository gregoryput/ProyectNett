namespace ProyectNettApi.DTO
{
    public class ProveedorDTO
    {
        public int IdProveedor { get; set; }
        public int IdPersona { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string Direccion { get; set; }
        public string Correo { get; set; }
        public int Edad { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public string Cedula { get; set; }
        public int IdSexo { get; set; }
        public string SexoNombre { get; set; }
        public string CiudadNombre { get; set; }
        public int IdCiudad { get; set; }
        public string PaisNombre { get; set; }
        public int IdPais { get; set; }
        public int IdEstadoRegistro { get; set; }
        public string NombreEstado { get; set; }
    }
}
