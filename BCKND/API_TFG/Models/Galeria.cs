using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_TFG.Models
{
    [Table("galeria")]
    public class Galeria
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("src")]
        public string Src { get; set; } = null!;

        [Column("categoria")]
        public string Categoria { get; set; } = null!;

        [Column("title")]
        public string Title { get; set; } = null!;

        [Column("description")]
        public string Description { get; set; } = null!;

        [Column("descripcion_larga")]
        public string? DescripcionLarga { get; set; }

        [Column("proyecto")]
        public string? Proyecto { get; set; }

        [Column("anio")]
        public string? Anio { get; set; }

        [Column("imagenes_detalle")]
        public string? ImagenesDetalle { get; set; }

        [Column("descripcion_larga_2")]
        public string? DescripcionLarga2 { get; set; }

        [Column("imagen_intermedia")]
        public string? ImagenIntermedia { get; set; }

        [Column("caption_intermedia")]
        public string? CaptionIntermedia { get; set; }

        [Column("caption_detalle_1")]
        public string? CaptionDetalle1 { get; set; }

        [Column("caption_detalle_2")]
        public string? CaptionDetalle2 { get; set; }
    }
}