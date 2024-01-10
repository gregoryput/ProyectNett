using ProyectNettApi.Models;

namespace ProyectNettApi.DTO
{
    public class PersonaInfoPersonalDTO
    {
        public int IdPersona { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Cedula { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public string Correo { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string Direccion { get; set; }

        // Propiedades para la relación con País
        public int IdPais { get; set; }
        public string PaisNombre { get; set; }

        // Propiedades para la relación con Ciudad
        public int IdCiudad { get; set; }
        public string CiudadNombre { get; set; }

        // Propiedades para la relación con Sexo
        public int IdSexo { get; set; }
        public string SexoNombre { get; set; }

        // Propiedades para la relación con Imagen
        public int? IdImagen { get; set; }
        public string? FileName { get; set; }
        public string? ContentType { get; set; }
        public long? FileSize { get; set; }
        public string Data { get; set; }
        public bool YaEstaAsociado { get; set; }
        public List<PersonaTipoPersona>? PersonaTiposPersona { get; set; }
        public Entidad? Entidad { get; set; }

        // --- Datos con la relacion EntidadesPersonasFisicas:
        // --- public EntidadPersonaFisica? DataEntidadPersonaFisica { get; set; }
        // --- public EntidadPersonaFisicaRepresentante? DataEntidadPersonaFisicaRepresentante { get; set; }
    }
}
