using API_TFG.Data;
using API_TFG.Models;

namespace API_TFG.Repositories
{
    public class GaleriaRepository : IGaleriaRepository
    {
        private readonly ApplicationDbContext _context;

        public GaleriaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Galeria> GetAll()
        {
            return _context.Galeria.ToList();
        }

        public Galeria? GetById(int id)
        {
            return _context.Galeria.Find(id);
        }

        public IEnumerable<Galeria> GetByCategoria(string categoria)
        {
            return _context.Galeria
                           .Where(g => g.Categoria == categoria)
                           .ToList();
        }

        public void Add(Galeria galeria)
        {
            _context.Galeria.Add(galeria);
            _context.SaveChanges();
        }

        public void Update(Galeria galeria)
        {
            _context.Galeria.Update(galeria);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var galeria = _context.Galeria.Find(id);
            if (galeria != null)
            {
                _context.Galeria.Remove(galeria);
                _context.SaveChanges();
            }
        }
    }
}
