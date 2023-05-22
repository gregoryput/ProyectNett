namespace ProyectNettApi.Models
{
    public class Cliente : Persona
    {
        public int IdCliente { get; set; }
        public int IdEmpresa { get; set; }
        public int IdPersonaDeContacto { get; set; }
        public int IdCreadoPor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdModificadoPor { get; set; }
        public DateTime FechaModificacion { get; set; }
        public int IdEstadoRegistro { get; set; }
    }
}
