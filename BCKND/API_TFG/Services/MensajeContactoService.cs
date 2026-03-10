using API_TFG.Models;
using API_TFG.Repositories;

namespace API_TFG.Services
{
    public class MensajeContactoService
    {
        private readonly IMensajeContactoRepository _mensajeContactoRepository;

        public MensajeContactoService(IMensajeContactoRepository mensajeContactoRepository)
        {
            _mensajeContactoRepository = mensajeContactoRepository;
        }

        public IEnumerable<MensajeContacto> GetAll()
        {
            return _mensajeContactoRepository.GetAll();
        }

        public MensajeContacto? GetById(int id)
        {
            return _mensajeContactoRepository.GetById(id);
        }

        public void Add(MensajeContacto mensaje)
        {
            _mensajeContactoRepository.Add(mensaje);
        }

        public void Delete(int id)
        {
            _mensajeContactoRepository.Delete(id);
        }
    }
}
