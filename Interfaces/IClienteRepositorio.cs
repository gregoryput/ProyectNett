using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IClienteRepositorio
    {
        public IEnumerable<ClienteDTO> GetClientes();
        public void InsertarCliente(Cliente cliente);
        public void EliminarCliente(int IdCliente);
        public void ActualizarCliente(Cliente cliente);
    }
}
