using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_TFG.Models
{
    [Table("mensajes_contacto")]
    public class MensajeContacto
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; } = null!;

        [Column("apellido")]
        public string Apellido { get; set; } = null!;

        [Column("correo")]
        public string Correo { get; set; } = null!;

        [Column("telefono")]
        public string? Telefono { get; set; }

        [Column("asunto")]
        public string Asunto { get; set; } = null!;

        [Column("descripcion")]
        public string Descripcion { get; set; } = null!;

        [Column("fecha_envio")]
        public DateTime FechaEnvio { get; set; }
    }
}
