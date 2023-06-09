using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.ComponentModel.DataAnnotations;
using System.Data;
using static Dapper.SqlMapper;

namespace ProyectNettApi.Models
{
    public class Proveedor
    {
        [Key]
        public int IdProveedor { get; set; }
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdEstadoProveedor { get; set; }
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
        //<--
        //<--

        [Required(ErrorMessage = "Este campo es requerido")]
        public Persona Persona { get; set; }
        //<--
        //<--

        public List<Empresa> Empresas { get; set; }
    }
}