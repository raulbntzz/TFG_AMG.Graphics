namespace API_TFG.DTOs
{
    public class UploadGaleriaDto
    {
        public string Src { get; set; } = null!;
        public string Categoria { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? DescripcionLarga { get; set; }
        public string? DescripcionLarga2 { get; set; }
        public string? Proyecto { get; set; }
        public string? Anio { get; set; }
        public string? ImagenIntermedia { get; set; }
        public string? CaptionIntermedia { get; set; }
        public string? ImagenesDetalle { get; set; }
        public string? CaptionDetalle1 { get; set; }
        public string? CaptionDetalle2 { get; set; }
    }
}