using ProyectNettApi.Models;

namespace ProyectNettApi.Interfaces
{
    public interface ISexoRepositorio
    {
        public IEnumerable<Sexo> GetSexos();
    }
}
