namespace ProyectNettApi.Models
{
    public class EntidadProveedor
    {
        public int IdEntidad { get; set; }
        public string NombreEntidad { get; set; }
        public string? FileName { get; set; }
        public string? ContentType { get; set; }
        public int? FileSize { get; set; }
        public byte[]? Data { get; set; }
    }
}
