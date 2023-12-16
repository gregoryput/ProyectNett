namespace ProyectNettApi.Models
{
    public class Entidad
    {
        public int IdEntidad { get; set; }
        public string NombreEntidad { get; set; }
        public int IdTipoEntidad { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
        public EntidadRolEntidad? EntidadRolEntidad { get; set; }
        public EntidadPersonaFisica? EntidadPersonaFisica { get; set; }
        public EntidadPersonaFisicaRepresentante? EntidadPersonaFisicaRepresentante { get; set; }
        public ClienteEntidad? ClienteEntidad { get; set; }
    }



    public class EntidadRolEntidad
    {
        public int IdEntidadRolEntidad { get; set; }
        public int IdEntidad { get; set; }
        public int IdRolEntidad { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }



    public class EntidadPersonaFisica
    {
        public int IdEntidadPersonaFisica { get; set; }
        public int IdEntidad { get; set; }
        public int IdPersona { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }




    public class EntidadPersonaFisicaRepresentante
    {
        public int IdEPFR { get; set; }
        public int IdEntidadPersonaFisica { get; set; }
        public int IdRepresentanteActual { get; set; }
        public int IdRolRepresentante { get; set; }
        public DateTime FechaInicioRepresentante { get; set; }
        public DateTime FechaFinRepresentante { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }



    public class ClienteEntidad
    {
        public int IdCliente { get; set; }
        public string Codigo { get; set; }
        public int IdEntidad { get; set; }
        public DateTime FechaInicioCliente { get; set; }
        public int? IdCreadoPor { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? IdModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdEstadoRegistro { get; set; }
    }

}
