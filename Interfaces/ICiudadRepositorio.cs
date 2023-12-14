using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface ICiudadRepositorio
    {
        public IEnumerable<PersonaDTO> getCities(int idPais);
        public void InsertarCiudad(PersonaDTO ciudad);
    }
}
