namespace API_TFG.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = null!;
        public UsuarioDto Usuario { get; set; } = null!;
    }
}
