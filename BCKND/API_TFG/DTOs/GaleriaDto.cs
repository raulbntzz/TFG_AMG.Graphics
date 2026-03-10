namespace API_TFG.DTOs
{
    public class GaleriaDto
    {
        public int Id { get; set; }
        public string Src { get; set; } = null!;
        public string Categoria { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Height { get; set; }
    }
}
