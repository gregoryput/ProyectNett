using ProyectNettApi.DTO;

namespace ProyectNettApi.Interfaces
{
    public interface IEmpresaRepositorio
    {
        public IEnumerable<EmpresaInfoDTO> GetDatosEmpresas();
    }
}
