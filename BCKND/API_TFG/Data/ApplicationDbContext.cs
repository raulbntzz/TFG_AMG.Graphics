using API_TFG.Models;
using Microsoft.EntityFrameworkCore;

namespace API_TFG.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<MensajeContacto> MensajesContacto { get; set; }
        public DbSet<Galeria> Galeria { get; set; }
    }
}
