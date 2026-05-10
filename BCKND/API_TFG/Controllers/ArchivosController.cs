using Microsoft.AspNetCore.Mvc;

namespace API_TFG.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArchivosController : ControllerBase
    {
        private readonly string _uploadsFolder;

        public ArchivosController(IConfiguration configuration)
        {
            _uploadsFolder = configuration["FileUpload:GaleriaPath"]
                ?? Path.Combine(AppContext.BaseDirectory, "Uploads");
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!Directory.Exists(_uploadsFolder))
                return Ok(new List<object>());

            var carpetas = Directory.GetDirectories(_uploadsFolder)
                .Select(carpetaPath =>
                {
                    var carpeta = Path.GetFileName(carpetaPath);
                    var archivos = Directory.GetFiles(carpetaPath)
                        .Where(f => IsAllowed(f))
                        .Select(f => new
                        {
                            nombre = Path.GetFileName(f),
                            ruta = $"uploads/{carpeta}/{Path.GetFileName(f)}",
                            esVideo = IsVideo(f)
                        })
                        .ToList();
                    return new { carpeta, archivos };
                })
                .ToList();

            return Ok(carpetas);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] IFormFile archivo, [FromForm] string carpeta)
        {
            if (archivo == null || archivo.Length == 0)
                return BadRequest("Archivo requerido");

            if (string.IsNullOrWhiteSpace(carpeta))
                return BadRequest("Carpeta requerida");

            carpeta = carpeta.Trim().ToLower().Replace(" ", "-");

            var ext = Path.GetExtension(archivo.FileName).ToLower();
            if (!new[] { ".jpg", ".jpeg", ".png", ".gif", ".mp4", ".webm" }.Contains(ext))
                return BadRequest("Formato no permitido");

            var carpetaPath = Path.Combine(_uploadsFolder, carpeta);
            if (!Directory.Exists(carpetaPath))
                Directory.CreateDirectory(carpetaPath);

            var fileName = archivo.FileName;
            var filePath = Path.Combine(carpetaPath, fileName);

            // Si ya existe, añade sufijo numérico
            if (System.IO.File.Exists(filePath))
            {
                var name = Path.GetFileNameWithoutExtension(fileName);
                var i = 1;
                while (System.IO.File.Exists(filePath))
                {
                    fileName = $"{name}_{i}{ext}";
                    filePath = Path.Combine(carpetaPath, fileName);
                    i++;
                }
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
                await archivo.CopyToAsync(stream);

            return Ok(new
            {
                nombre = fileName,
                ruta = $"uploads/{carpeta}/{fileName}",
                esVideo = IsVideo(fileName)
            });
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] string ruta)
        {
            if (string.IsNullOrEmpty(ruta))
                return BadRequest("Ruta requerida");

            if (ruta.Contains(".."))
                return BadRequest("Ruta inválida");

            var nombreCarpeta = ruta.Replace("uploads/", "").Split('/')[0];
            var nombreArchivo = Path.GetFileName(ruta);
            var filePath = Path.Combine(_uploadsFolder, nombreCarpeta, nombreArchivo);

            if (!System.IO.File.Exists(filePath))
                return NotFound("Archivo no encontrado");

            System.IO.File.Delete(filePath);
            return NoContent();
        }

        private static bool IsAllowed(string path)
        {
            var ext = Path.GetExtension(path).ToLower();
            return new[] { ".jpg", ".jpeg", ".png", ".gif", ".mp4", ".webm" }.Contains(ext);
        }

        private static bool IsVideo(string path)
        {
            var ext = Path.GetExtension(path).ToLower();
            return ext == ".mp4" || ext == ".webm";
        }
    }
}