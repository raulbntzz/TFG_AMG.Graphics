namespace API_TFG.DTOs
{
    public class MensajeContactoDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string? Telefono { get; set; }
        public string Asunto { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public DateTime FechaEnvio { get; set; }
    }

    public class CreateMensajeContactoDto
    {
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string? Telefono { get; set; }
        public string Asunto { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
    }
}
