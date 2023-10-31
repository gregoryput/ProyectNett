using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Empresa
    {
        [Key]
        public int IdEmpresa { get; set; }
        //<--
        //<--

        [StringLength(maximumLength: 60, MinimumLength = 2, ErrorMessage = "Este campo debe estar entre 2 y 60 caracteres")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string NombreEmpresa { get; set; }
        //<--
        //<--

        [RegularExpression(@"^[0-9]{9}$", ErrorMessage = "El formato del RNC no es válido. Debe tener exactamente 9 dígitos.")]
        [StringLength(9, MinimumLength = 9, ErrorMessage = "El RNC debe tener exactamente 9 numeros.")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string RNC { get; set; }
        //<--
        //<--

        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string Correo { get; set; }
        //<--
        //<--

        [RegularExpression(@"^\d{3}-\d{3}-\d{4}$", ErrorMessage = "El formato del número de teléfono no es válido.")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string Teléfono1 { get; set; }
        //<--
        //<--

        [RegularExpression(@"^\d{3}-\d{3}-\d{4}$", ErrorMessage = "El formato del número de teléfono no es válido.")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string Teléfono2 { get; set; }
        //<--
        //<--

        [Url(ErrorMessage = "El formato del sitio web no es válido.")]
        [Required(ErrorMessage = "Este campo es requerido")]
        public string SitioWeb { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        [StringLength(maximumLength: 60, MinimumLength = 3, ErrorMessage = "Este campo debe estar entre 3 y 60 caracteres")]
        public string Dirección { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdCiudad { get; set; }
        //<--
        //<--
        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdPais { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public string PaisNombre { get; set; }
        //<--
        //<--
        [Required(ErrorMessage = "Este campo es requerido")]
        public string CiudadNombre { get; set; }
        //<--
        //<--
        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdCreadoPor { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public DateTime FechaCreacion { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdModificadoPor { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public DateTime FechaModificacion { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdEstadoRegistro { get; set; }
    }
}
