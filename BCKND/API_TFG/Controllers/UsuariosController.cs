using API_TFG.DTOs;
using API_TFG.Models;
using API_TFG.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_TFG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        private readonly ILogger<UsuariosController> _logger;

        public UsuariosController(UsuarioService usuarioService, ILogger<UsuariosController> logger)
        {
            _usuarioService = usuarioService;
            _logger = logger;
        }

        // POST: api/usuarios/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            try
            {
                _logger.LogInformation("Registrando nuevo usuario con email {Email}", dto.Email);
                var response = _usuarioService.Register(dto);
                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        // POST: api/usuarios/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            try
            {
                _logger.LogInformation("Inicio de sesión para {Email}", dto.Email);
                var response = _usuarioService.Login(dto);
                if (response == null)
                    return Unauthorized("Credenciales incorrectas");
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al iniciar sesión para {Email}", dto.Email);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        // GET: api/usuarios
        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Obteniendo todos los usuarios");
            var usuarios = _usuarioService.GetAll();
            return Ok(usuarios);
        }

        // GET: api/usuarios/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("Obteniendo usuario con id {Id}", id);
            var usuario = _usuarioService.GetById(id);
            if (usuario == null)
                return NotFound($"No existe ningún usuario con id {id}");
            return Ok(usuario);
        }

        // GET: api/usuarios/email/{email}
        [HttpGet("email/{email}")]
        public IActionResult GetByEmail(string email)
        {
            _logger.LogInformation("Obteniendo usuario con email {Email}", email);
            var usuario = _usuarioService.GetByEmail(email);
            if (usuario == null)
                return NotFound($"No existe ningún usuario con email {email}");
            return Ok(usuario);
        }

        // PUT: api/usuarios/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateUsuarioDto usuarioDto)
        {
            if (id != usuarioDto.Id)
                return BadRequest("El id de la URL no coincide con el del cuerpo");

            var usuarioExistente = _usuarioService.GetById(id);
            if (usuarioExistente == null)
                return NotFound($"No existe ningún usuario con id {id}");

            _logger.LogInformation("Actualizando usuario con id {Id}", id);
            _usuarioService.Update(usuarioDto);
            return NoContent();
        }

        // DELETE: api/usuarios/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Eliminando usuario con id {Id}", id);
            _usuarioService.Delete(id);
            return NoContent();
        }
    }
}
