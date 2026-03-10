using API_TFG.DTOs;
using API_TFG.Models;
using API_TFG.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_TFG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MensajesContactoController : ControllerBase
    {
        private readonly MensajeContactoService _mensajeContactoService;
        private readonly ILogger<MensajesContactoController> _logger;

        public MensajesContactoController(MensajeContactoService mensajeContactoService, ILogger<MensajesContactoController> logger)
        {
            _mensajeContactoService = mensajeContactoService;
            _logger = logger;
        }

        // GET: api/mensajescontacto
        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Obteniendo todos los mensajes de contacto");
            var mensajes = _mensajeContactoService.GetAll();
            return Ok(mensajes);
        }

        // GET: api/mensajescontacto/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("Obteniendo mensaje de contacto con id {Id}", id);
            var mensaje = _mensajeContactoService.GetById(id);
            if (mensaje == null)
                return NotFound($"No existe ningún mensaje con id {id}");
            return Ok(mensaje);
        }

        // POST: api/mensajescontacto
        [HttpPost]
        public IActionResult Add([FromBody] CreateMensajeContactoDto dto)
        {
            try
            {
                _logger.LogInformation("Creando nuevo mensaje de contacto de {Nombre}", dto.Nombre);

                var mensaje = new MensajeContacto
                {
                    Nombre = dto.Nombre,
                    Apellido = dto.Apellido,
                    Correo = dto.Correo,
                    Telefono = dto.Telefono,
                    Asunto = dto.Asunto,
                    Descripcion = dto.Descripcion,
                    FechaEnvio = DateTime.Now
                };

                _mensajeContactoService.Add(mensaje);
                return CreatedAtAction(nameof(GetById), new { id = mensaje.Id }, mensaje);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear mensaje de contacto");
                return StatusCode(500, "Error al guardar el mensaje. Verifica que todos los campos sean válidos.");
            }
        }

        // DELETE: api/mensajescontacto/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Eliminando mensaje de contacto con id {Id}", id);
            _mensajeContactoService.Delete(id);
            return NoContent();
        }
    }
}
