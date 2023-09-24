using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IUQExisteRepositorio
    {
        public IEnumerable<UQExiste> VerificarUQCedula(string Cedula);
        public IEnumerable<dynamic> VerificarUQCedulaNoModel(string Cedula);
    }
}
