namespace API_TFG.DTOs
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Rol { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Telefono { get; set; }
    }
}
