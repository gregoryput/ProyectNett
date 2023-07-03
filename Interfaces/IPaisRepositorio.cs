using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface IPaisRepositorio
    {
        public IEnumerable<Pais> getCountries();
        public void InsertarPais(Pais pais);
    }
}
