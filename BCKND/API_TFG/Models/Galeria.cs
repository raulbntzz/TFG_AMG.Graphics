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

        [Column("height")]
        public int Height { get; set; } = 400;
    }
}
