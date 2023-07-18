using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IEmpleadoRepositorio
    {
        //public void InsertarCliente(Cliente cliente);
        public void EliminarCliente(int IdCliente);
        //public void ActualizarCliente(Cliente cliente);
        public (IEnumerable<EmpleadoDTO> empleados, int totalCount) GetEmpleados(int pageNumber, int pageSize);
        public void InsertarEmpleado(Empleado empleado);
    }
}
