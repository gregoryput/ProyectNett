namespace ProyectNettApi.Models
{
    public class Imagen
    {
        public int IdImagen { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public int FileSize { get; set; }
        public byte[] Data { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }
    public class PersonaImagen
    {
        public int IdImagen { get; set; }
        public int IdPersona { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

    public class ProductoImagen
    {
        public int IdProductoImagen { get; set; }
        public int IdImagen { get; set; }
        public int IdProducto { get; set; }
        public bool EsLaPrincipal { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }


    public class DataImagenPersona
    {
        public Imagen Imagen { get; set; }
        public PersonaImagen PersonaImagen { get; set; }
    }

    public class DataImagenProducto
    {
        public Imagen Imagen { get; set; }
        public ProductoImagen ProductoImagen { get; set; }
    }
}
