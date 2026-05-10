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

        public GaleriaController(GaleriaService galeriaService)
        {
            _galeriaService = galeriaService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_galeriaService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var imagen = _galeriaService.GetById(id);
            if (imagen == null)
                return NotFound($"No existe ninguna imagen con id {id}");
            return Ok(imagen);
        }

        [HttpPost]
        public IActionResult Create([FromBody] UploadGaleriaDto dto)
        {
            try
            {
                var galeria = _galeriaService.CreateFromDto(dto);
                return CreatedAtAction(nameof(GetById), new { id = galeria.Id }, galeria);
            }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UploadGaleriaDto dto)
        {
            try
            {
                var imagen = _galeriaService.GetById(id);
                if (imagen == null)
                    return NotFound($"No existe ninguna imagen con id {id}");

                if (!string.IsNullOrEmpty(dto.Src)) imagen.Src = dto.Src;
                if (!string.IsNullOrEmpty(dto.Categoria)) imagen.Categoria = dto.Categoria;
                if (!string.IsNullOrEmpty(dto.Title)) imagen.Title = dto.Title;
                if (!string.IsNullOrEmpty(dto.Description)) imagen.Description = dto.Description;
                if (dto.DescripcionLarga != null) imagen.DescripcionLarga = dto.DescripcionLarga;
                if (dto.DescripcionLarga2 != null) imagen.DescripcionLarga2 = dto.DescripcionLarga2;
                if (dto.Proyecto != null) imagen.Proyecto = dto.Proyecto;
                if (dto.Anio != null) imagen.Anio = dto.Anio;
                if (dto.ImagenIntermedia != null) imagen.ImagenIntermedia = dto.ImagenIntermedia;
                if (dto.CaptionIntermedia != null) imagen.CaptionIntermedia = dto.CaptionIntermedia;
                if (dto.ImagenesDetalle != null) imagen.ImagenesDetalle = dto.ImagenesDetalle;
                if (dto.CaptionDetalle1 != null) imagen.CaptionDetalle1 = dto.CaptionDetalle1;
                if (dto.CaptionDetalle2 != null) imagen.CaptionDetalle2 = dto.CaptionDetalle2;

                _galeriaService.Update(imagen);
                return NoContent();
            }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _galeriaService.Delete(id);
            return NoContent();
        }
    }
}