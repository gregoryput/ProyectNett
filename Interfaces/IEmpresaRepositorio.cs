using ProyectNettApi.DTO;

namespace ProyectNettApi.Interfaces
{
    public interface IEmpresaRepositorio
    {
        public IEnumerable<EmpresaDTO> GetEmpresasByIdCliente(int ClienteId, int EstadoId);
    }
}
