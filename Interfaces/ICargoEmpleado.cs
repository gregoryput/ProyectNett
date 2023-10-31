using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.DTO;

namespace ProyectNettApi.Interfaces
{
    public interface ICargoEmpleado
    {
        public IEnumerable<CargoDTO> GetCargo();
        public IEnumerable<CargoEmpleadoDTO> GetCargoByIdEmpleado(int IdEmpleado, int EstadoId);
    }
}