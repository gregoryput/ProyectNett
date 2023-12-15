using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IProyectoRespositorio
    {
        public IEnumerable<ServiciosDTO> GetServicio();
        public IEnumerable<ProyectoClienteDTO> GetClienteProyecto();
        public IEnumerable<ParametroCostoDTO> GetParametros();
        public IEnumerable<ProyectoEmpleadoDTO> GetEmpeleadoProyecto();
        public IEnumerable<PrioridadDTO> GetPrioridad();
        public IEnumerable<ResponsabilidadesDTO> GetResponsabilidad();
        public IEnumerable<ProyectoProductosDTO> GetProyectosProductos();
        public void InsertarParametroCosto(ParametroCosto parametro);
        public void InsertarProyecto(Proyecto proyecto);

        /// lista para presupuesto vista 
        /// 
        public IEnumerable<ProyectoDTO> GetListaProyecto();
        public IEnumerable<ListaProyectoDTO> GetObtenerDatosProyecto(int IdProyecto);
        public void UdapteEstado(int IdProyecto, int IdTarea, int IdEstado);

        // Listado de documentos hechos a los proyectos
        public IEnumerable<DocumentoDTO> GetListaDocumentosVentas();
    }
}