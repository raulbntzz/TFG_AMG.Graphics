namespace API_TFG.DTOs
{
    public class RegisterDto
    {
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Telefono { get; set; }
        public string Password { get; set; } = null!;
        public string Rol { get; set; } = "Usuario";
    }
}
