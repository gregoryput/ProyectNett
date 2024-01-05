using ProyectNettApi.DTO;
using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IPersonaRepositorio
    {
        public void InsertarPersona(Persona persona);
        public void ActualizarPersona(Persona persona);
        public IEnumerable<PersonaInfoPersonalDTO> GetPersonasInfoPersonal();
    }
}
