using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface ICiudadRepositorio
    {
        public IEnumerable<Ciiudad> getCities(int idPais);
        public void InsertarCiudad(Ciiudad ciudad);
        public IEnumerable<Ciiudad> getCiti();
    }
}
