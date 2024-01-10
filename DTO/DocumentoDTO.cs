namespace ProyectNettApi.DTO
{
    public class DocumentoDTO
    {
        public int IdDocumento { get; set; }
        public int IdTipoDocumento { get; set; }
        public string DocumentoNombre { get; set; }
        public DateTime FechaDeEmision { get; set; }
        public decimal MontoTotal { get; set; }
        public decimal MontoInicial { get; set; }
        public string Secuencia { get; set; }
        public int IdCliente { get; set; }
        public string NombreEntidad { get; set; }
        public int IdTipoEntidad { get; set; }
        public string NombreTipoEntidad { get; set; }
        public int IdEstado { get; set; }
        public int IdProyecto { get; set; }
        public string NombreProyecto { get; set; }
    }
}
