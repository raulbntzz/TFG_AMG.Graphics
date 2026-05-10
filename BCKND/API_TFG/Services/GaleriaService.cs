using API_TFG.DTOs;
using API_TFG.Models;
using API_TFG.Repositories;

namespace API_TFG.Services
{
    public class GaleriaService
    {
        private readonly IGaleriaRepository _galeriaRepository;

        public GaleriaService(IGaleriaRepository galeriaRepository)
        {
            _galeriaRepository = galeriaRepository;
        }

        public IEnumerable<Galeria> GetAll() => _galeriaRepository.GetAll();
        public Galeria? GetById(int id) => _galeriaRepository.GetById(id);
        public void Update(Galeria galeria) => _galeriaRepository.Update(galeria);

        public void Delete(int id)
        {
            var galeria = _galeriaRepository.GetById(id);
            if (galeria != null)
                _galeriaRepository.Delete(id);
        }

        public Galeria CreateFromDto(UploadGaleriaDto dto)
        {
            if (string.IsNullOrEmpty(dto.Src))
                throw new ArgumentException("La imagen es requerida");

            var galeria = new Galeria
            {
                Src = dto.Src,
                Categoria = dto.Categoria,
                Title = dto.Title,
                Description = dto.Description,
                DescripcionLarga = dto.DescripcionLarga,
                DescripcionLarga2 = dto.DescripcionLarga2,
                Proyecto = dto.Proyecto,
                Anio = dto.Anio,
                ImagenIntermedia = dto.ImagenIntermedia,
                CaptionIntermedia = dto.CaptionIntermedia,
                ImagenesDetalle = dto.ImagenesDetalle,
                CaptionDetalle1 = dto.CaptionDetalle1,
                CaptionDetalle2 = dto.CaptionDetalle2,
            };

            _galeriaRepository.Add(galeria);
            return galeria;
        }
    }
}