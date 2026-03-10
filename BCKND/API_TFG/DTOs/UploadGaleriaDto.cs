namespace API_TFG.DTOs
{
    public class UploadGaleriaDto
    {
        public string Categoria { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Height { get; set; } = 400;
        public IFormFile? Archivo { get; set; }
    }
}
