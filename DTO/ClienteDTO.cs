namespace ProyectNettApi.DTO
{
    public class ClienteDTO
    {
        public int IdCliente { get; set; }
        public string NombreEntidad { get; set; }
        public string Codigo { get; set; }
        public int IdTipoEntidad { get; set; }
        public string NombreTipoEntidad { get; set; }
        public string Identificacion { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public DateTime FechaInicioCliente { get; set; }
        public string CiudadNombre { get; set; }
        public string PaisNombre { get; set; }
    }
} 