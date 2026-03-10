using API_TFG.Data;
using API_TFG.Models;

namespace API_TFG.Repositories
{
    public class MensajeContactoRepository : IMensajeContactoRepository
    {
        private readonly ApplicationDbContext _context;

        public MensajeContactoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<MensajeContacto> GetAll()
        {
            return _context.MensajesContacto.ToList();
        }

        public MensajeContacto? GetById(int id)
        {
            return _context.MensajesContacto.Find(id);
        }

        public void Add(MensajeContacto mensaje)
        {
            _context.MensajesContacto.Add(mensaje);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var mensaje = _context.MensajesContacto.Find(id);
            if (mensaje != null)
            {
                _context.MensajesContacto.Remove(mensaje);
                _context.SaveChanges();
            }
        }
    }
}
