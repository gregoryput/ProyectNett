using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IEmpleadoRepositorio
    {
        public void EliminarEmpleado(int IdEmpleado);
        public void ActualizarEmpleado(Empleado empleado);
        public (IEnumerable<EmpleadoDTO> empleados, int totalCount) GetEmpleados(int pageNumber, int pageSize);
        public void InsertarEmpleado(Empleado empleado);
    }
}
