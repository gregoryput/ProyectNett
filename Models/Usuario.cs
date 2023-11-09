using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public int IdRol { get; set; }
        public int IdEmpleado { get; set; }

        //[Required(ErrorMessage = "Este campo es requerido")]
        public int IdCreadoPor { get; set; }
        //<--
        //<--

        //[Required(ErrorMessage = "Este campo es requerido")]
        public int IdModificadoPor { get; set; }
        //<--
        //<--


    }
}
