using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface ICiudadRepositorio
    {
        public IEnumerable<Ciudad> getCities(int idPais);
        public void InsertarCiudad(Ciudad ciudad);
        public IEnumerable<Ciudad> getCiti();
    }
}
