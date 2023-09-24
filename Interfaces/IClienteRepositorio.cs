using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IClienteRepositorio
    {
        public void InsertarCliente(Cliente cliente);
        public void EliminarCliente(int IdCliente);
        public void ActivarCliente(int IdCliente);
        public void ActualizarCliente(Cliente cliente);
        public ClienteDTO GetInfoPersonalCliente (int IdCliente);
        public (IEnumerable<ClienteDTO> clientes, int totalCount) GetClientesPag(int pageNumber, int pageSize);
        public IEnumerable<ClienteDTO> GetClientes();
    }
}
