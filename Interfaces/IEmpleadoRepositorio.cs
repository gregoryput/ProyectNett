using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IEmpleadoRepositorio
    {
        public IEnumerable<EmpleadoDTO> GetEmpleado();
        public EmpleadoDTO GetInfoPersonalEmpleado(int Id);
        public (IEnumerable<EmpleadoDTO> empleados, int totalCount) GetEmpleados(int pageNumber, int pageSize);
        public void InsertarEmpleado(Empleado empleado);
        public void ActualizarEmpleado(Empleado empleado);
        public void ActivarEmpleado(int IdEmpleado);
        public void EliminarEmpleado(int IdEmpleado);

    }
}
