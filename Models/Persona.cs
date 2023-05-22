namespace ProyectNettApi.Models
{
    public class Persona
    {
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
        public int IdCiudad { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdModificadoPor { get; set; }
        public DateTime FechaModificacion { get; set; }
        public int IdEstadoRegistro { get; set; }
    }
}