using API_TFG.DTOs;
using API_TFG.Models;
using API_TFG.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_TFG.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        public IEnumerable<UsuarioDto> GetAll()
        {
            return _usuarioRepository.GetAll().Select(MapToDto);
        }

        public UsuarioDto? GetById(int id)
        {
            var usuario = _usuarioRepository.GetById(id);
            return usuario == null ? null : MapToDto(usuario);
        }

        public UsuarioDto? GetByEmail(string email)
        {
            var usuario = _usuarioRepository.GetByEmail(email);
            return usuario == null ? null : MapToDto(usuario);
        }

        public AuthResponseDto Register(RegisterDto dto)
        {
            if (_usuarioRepository.GetByEmail(dto.Email) != null)
                throw new InvalidOperationException("Ya existe un usuario con ese email");

            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Telefono = dto.Telefono,
                Rol = dto.Rol,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _usuarioRepository.Add(usuario);

            return new AuthResponseDto
            {
                Token = GenerateJwtToken(usuario),
                Usuario = MapToDto(usuario)
            };
        }

        public AuthResponseDto? Login(LoginDto dto)
        {
            var usuario = _usuarioRepository.GetByEmail(dto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Password, usuario.Password))
                return null;

            return new AuthResponseDto
            {
                Token = GenerateJwtToken(usuario),
                Usuario = MapToDto(usuario)
            };
        }

        public void Update(UpdateUsuarioDto dto)
        {
            var usuario = new Usuario
            {
                Id = dto.Id,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Telefono = dto.Telefono,
                Rol = dto.Rol
            };
            
            _usuarioRepository.Update(usuario);
        }

        public void Delete(int id)
        {
            _usuarioRepository.Delete(id);
        }

        private string GenerateJwtToken(Usuario usuario)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, $"{usuario.Nombre} {usuario.Apellido}"),
                new Claim(ClaimTypes.Role, usuario.Rol)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(int.Parse(_configuration["Jwt:ExpirationHours"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static UsuarioDto MapToDto(Usuario usuario) => new()
        {
            Id = usuario.Id,
            Rol = usuario.Rol,
            Nombre = usuario.Nombre,
            Apellido = usuario.Apellido,
            Email = usuario.Email,
            Telefono = usuario.Telefono
        };
    }
}
