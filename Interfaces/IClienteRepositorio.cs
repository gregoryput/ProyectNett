using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IClienteRepositorio
    {
        public IEnumerable<ClienteDTO> GetClientesv1();
        public void InsertarCliente(Cliente cliente);
        public void EliminarCliente(int IdCliente);
        public void ActualizarCliente(Cliente cliente);
        public (IEnumerable<ClienteDTO> clientes, int totalCount) GetClientes(int pageNumber, int pageSize);
    }
}
