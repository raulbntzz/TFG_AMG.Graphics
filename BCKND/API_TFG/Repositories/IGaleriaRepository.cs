using API_TFG.Models;

namespace API_TFG.Repositories
{
    public interface IGaleriaRepository
    {
        IEnumerable<Galeria> GetAll();
        Galeria? GetById(int id);
        IEnumerable<Galeria> GetByCategoria(string categoria);
        void Add(Galeria galeria);
        void Update(Galeria galeria);
        void Delete(int id);
    }
}
