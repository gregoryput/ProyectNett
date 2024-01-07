namespace ProyectNettApi.DTO
{
    public class EmpresaInfoDTO
    {
        public int IdEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string RNC { get; set; }
        public string Correo { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public int IdPais { get; set; }
        public string PaisNombre { get; set; }
        public int IdCiudad { get; set; }
        public string CiudadNombre { get; set; }
        public DateTime Fundada { get; set; }
        public int IdEmpresaImagen { get; set; }
        public int IdImagen { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public int FileSize { get; set; }
        public byte[] Data { get; set; }
        public string Direccion { get; set; }
        public bool YaEstaAsociada { get; set; }
    }
}