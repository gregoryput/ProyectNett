using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface ICiudadRepositorio
    {
        public IEnumerable<Ciudad> getCities();
        public void InsertarCiudad(Ciudad ciudad);
    }
}
