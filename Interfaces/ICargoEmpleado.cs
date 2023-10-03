using ProyectNettApi.DTO;

namespace ProyectNettApi.Interfaces
{
    public interface ICargoEmpleado
    {
        public IEnumerable<CargoDTO> GetCargo();
    }
}