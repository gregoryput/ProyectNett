using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.DTO
{
    public class EmpresaDTO
    {
        public int IdEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string RNC { get; set; }
        public string Correo { get; set; }
        public string Teléfono1 { get; set; }
        public string Teléfono2 { get; set; }
        public string SitioWeb { get; set; }
        public string Dirección { get; set; }
        public int IdCiudad { get; set; }
        public int IdPais { get; set; }
        public string PaisNombre { get; set; }
        public string CiudadNombre { get; set; }
    }
}
