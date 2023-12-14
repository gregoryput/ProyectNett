using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Persona
    {
        [Key]
        public int IdPersona { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 40, MinimumLength = 2, ErrorMessage = "Este campo debe estar entre 2 y 40 caracteres")]
        public string Nombres { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 40, MinimumLength = 2, ErrorMessage = "Este campo debe estar entre 2 y 40 caracteres")]
        public string Apellidos { get; set; }
        //<--
        //<--
        [RegularExpression(@"^\d{3}-\d{3}-\d{4}$|^\d{10}$", ErrorMessage = "El formato del número de teléfono no es válido.")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string Telefono1 { get; set; }
        //<--
        //<--

        [RegularExpression(@"^\d{3}-\d{3}-\d{4}$|^\d{10}$", ErrorMessage = "El formato del número de teléfono no es válido.")]
        public string Telefono2 { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 60, MinimumLength = 3, ErrorMessage = "Este campo debe estar entre 3 y 60 caracteres")]
        public string Direccion { get; set; }
        //<--
        //<--

        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public string Correo { get; set; }
        //<--
        //<--


        public DateTime FechaDeNacimiento { get; set; }
        //<--
        //<--

        [RegularExpression(@"^\d{3}-\d{7}-\d{1}$|^\d{11}$", ErrorMessage = "El formato de la cédula no es válido.")]
        public string Cedula { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdSexo { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdCiudad { get; set; }

        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }

        // Relaciones -------- :
        public PersonaTipoPersona PersonaTiposPersona { get; set; }
    }

    public class Persona2
    {
        [Key]
        public int IdPersona { get; set; }
        //<--
        //<--
        public string Nombres { get; set; }
        //<--
        //<--
        public string Apellidos { get; set; }
        //<--
        //<--
        public string Telefono1 { get; set; }
        //<--
        //<--
        public string Telefono2 { get; set; }
        //<--
        //<--
        public string Direccion { get; set; }
        //<--
        //<--
        public string Correo { get; set; }
        //<--
        //<--
        public DateTime FechaDeNacimiento { get; set; }
        //<--
        //<--
        public string Cedula { get; set; }
        //<--
        //<--
        public int IdSexo { get; set; }
        //<--
        //<--
        public int IdCiudad { get; set; }

        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }

    }
}