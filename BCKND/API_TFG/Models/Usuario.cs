using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_TFG.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("rol")]
        public string Rol { get; set; } = "Usuario";

        [Column("nombre")]
        public string Nombre { get; set; } = null!;

        [Column("apellido")]
        public string Apellido { get; set; } = null!;

        [Column("email")]
        public string Email { get; set; } = null!;

        [Column("telefono")]
        public string? Telefono { get; set; }

        [Column("password")]
        public string Password { get; set; } = null!;
    }
}
