using API_TFG.DTOs;
using API_TFG.Models;
using API_TFG.Repositories;

namespace API_TFG.Services
{
    public class GaleriaService
    {
        private readonly IGaleriaRepository _galeriaRepository;
        private readonly FileUploadService _fileUploadService;

        public GaleriaService(IGaleriaRepository galeriaRepository, FileUploadService fileUploadService)
        {
            _galeriaRepository = galeriaRepository;
            _fileUploadService = fileUploadService;
        }

        public IEnumerable<Galeria> GetAll()
        {
            return _galeriaRepository.GetAll();
        }

        public Galeria? GetById(int id)
        {
            return _galeriaRepository.GetById(id);
        }

        public IEnumerable<Galeria> GetByCategoria(string categoria)
        {
            return _galeriaRepository.GetByCategoria(categoria);
        }

        public void Add(Galeria galeria)
        {
            _galeriaRepository.Add(galeria);
        }

        public void Update(Galeria galeria)
        {
            _galeriaRepository.Update(galeria);
        }

        public void Delete(int id)
        {
            var galeria = _galeriaRepository.GetById(id);
            if (galeria != null)
            {
                DeleteImage(galeria.Src);
                _galeriaRepository.Delete(id);
            }
        }

        public void DeleteImage(string fileSrc)
        {
            _fileUploadService.DeleteImage(fileSrc);
        }

        public async Task<Galeria> UploadImageAsync(UploadGaleriaDto dto)
        {
            if (dto.Archivo == null)
                throw new ArgumentException("El archivo es requerido");

            try
            {
                var filePath = await _fileUploadService.UploadImageAsync(dto.Archivo);

                var galeria = new Galeria
                {
                    Src = filePath,
                    Categoria = dto.Categoria,
                    Title = dto.Title,
                    Description = dto.Description,
                    Height = dto.Height
                };

                _galeriaRepository.Add(galeria);
                return galeria;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al subir la imagen: {ex.Message}");
            }
        }

        // Nuevo método para solo subir el archivo sin crear registro
        public async Task<string> UploadFileOnlyAsync(IFormFile archivo)
        {
            if (archivo == null)
                throw new ArgumentException("El archivo es requerido");

            try
            {
                return await _fileUploadService.UploadImageAsync(archivo);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al subir la imagen: {ex.Message}");
            }
        }
    }
}
