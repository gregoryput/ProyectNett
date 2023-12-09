using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.DTO;

namespace ProyectNettApi.Interfaces
{
    public interface IProyectoRespositorio
    {
        public IEnumerable<ServiciosDTO> GetServicio();
        public IEnumerable<ProyectoClienteDTO> GetClienteProyecto();
        public IEnumerable<UnidadesMedidaDTO> GetUnidades();
        public IEnumerable<ProyectoEmpleadoDTO> GetEmpeleadoProyecto();
        public IEnumerable<PrioridadDTO> GetPrioridad();
        public IEnumerable<ResponsabilidadesDTO> GetResponsabilidad();



    }
}