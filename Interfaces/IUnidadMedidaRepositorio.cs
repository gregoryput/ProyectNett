using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IUnidadMedidaRepositorio
    {
        public IEnumerable<UnidadesMedidaDTO> GetUnidadesMedida();
    }
}
