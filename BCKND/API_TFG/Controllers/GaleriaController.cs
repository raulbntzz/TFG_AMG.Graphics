using API_TFG.DTOs;
using API_TFG.Models;
using API_TFG.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_TFG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GaleriaController : ControllerBase
    {
        private readonly GaleriaService _galeriaService;
        private readonly ILogger<GaleriaController> _logger;

        public GaleriaController(GaleriaService galeriaService, ILogger<GaleriaController> logger)
        {
            _galeriaService = galeriaService;
            _logger = logger;
        }

        // GET: api/galeria
        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Obteniendo todas las imágenes de la galería");
            var galeria = _galeriaService.GetAll();
            return Ok(galeria);
        }

        // GET: api/galeria/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("Obteniendo imagen con id {Id}", id);
            var imagen = _galeriaService.GetById(id);
            if (imagen == null)
                return NotFound($"No existe ninguna imagen con id {id}");
            return Ok(imagen);
        }

        // GET: api/galeria/categoria/{categoria}
        [HttpGet("categoria/{categoria}")]
        public IActionResult GetByCategoria(string categoria)
        {
            _logger.LogInformation("Obteniendo imágenes de categoría {Categoria}", categoria);
            var galeria = _galeriaService.GetByCategoria(categoria);
            return Ok(galeria);
        }

        // POST: api/galeria
        [HttpPost]
        public IActionResult Add([FromBody] Galeria galeria)
        {
            _logger.LogInformation("Añadiendo nueva imagen a la galería");
            _galeriaService.Add(galeria);
            return CreatedAtAction(nameof(GetById), new { id = galeria.Id }, galeria);
        }

        // PUT: api/galeria/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UploadGaleriaDto? uploadDto)
        {
            try
            {
                var imagen = _galeriaService.GetById(id);
                if (imagen == null)
                    return NotFound($"No existe ninguna imagen con id {id}");

                _logger.LogInformation("Actualizando imagen con id {Id}", id);

                // Si viene un archivo, procesarlo
                if (uploadDto?.Archivo != null)
                {
                    var newFilePath = await _galeriaService.UploadFileOnlyAsync(uploadDto.Archivo);
                    // Eliminar archivo anterior
                    _galeriaService.DeleteImage(imagen.Src);
                    imagen.Src = newFilePath;
                }

                // Actualizar otros campos
                if (!string.IsNullOrEmpty(uploadDto?.Categoria))
                    imagen.Categoria = uploadDto.Categoria;
                if (!string.IsNullOrEmpty(uploadDto?.Title))
                    imagen.Title = uploadDto.Title;
                if (!string.IsNullOrEmpty(uploadDto?.Description))
                    imagen.Description = uploadDto.Description;
                if (uploadDto?.Height > 0)
                    imagen.Height = uploadDto.Height;

                _galeriaService.Update(imagen);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/galeria/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Eliminando imagen con id {Id}", id);
            _galeriaService.Delete(id);
            return NoContent();
        }

        // POST: api/galeria/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] UploadGaleriaDto uploadDto)
        {
            try
            {
                _logger.LogInformation("Subiendo nueva imagen a la galería");
                var galeria = await _galeriaService.UploadImageAsync(uploadDto);
                return CreatedAtAction(nameof(GetById), new { id = galeria.Id }, galeria);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
