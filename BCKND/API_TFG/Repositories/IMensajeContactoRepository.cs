using API_TFG.Models;

namespace API_TFG.Repositories
{
    public interface IMensajeContactoRepository
    {
        IEnumerable<MensajeContacto> GetAll();
        MensajeContacto? GetById(int id);
        void Add(MensajeContacto mensaje);
        void Delete(int id);
    }
}
