namespace API_TFG.Services
{
    public class FileUploadService
    {
        private readonly string _uploadsFolder;
        private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

        public FileUploadService(IConfiguration configuration)
        {
            var galeriaPath = configuration["FileUpload:GaleriaPath"];

            if (string.IsNullOrEmpty(galeriaPath))
            {
                _uploadsFolder = Path.Combine(AppContext.BaseDirectory, "Uploads", "Galeria");
                Console.WriteLine($"[ADVERTENCIA] FileUpload:GaleriaPath no configurado. Usando: {_uploadsFolder}");
            }
            else
            {
                _uploadsFolder = galeriaPath;
            }

            try
            {
                if (!Directory.Exists(_uploadsFolder))
                {
                    Console.WriteLine($"[INFO] Creando carpeta: {_uploadsFolder}");
                    Directory.CreateDirectory(_uploadsFolder);
                    Console.WriteLine($"[INFO] Carpeta creada exitosamente");
                }
                else
                {
                    Console.WriteLine($"[INFO] Carpeta encontrada: {_uploadsFolder}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] No se pudo crear/acceder a la carpeta '{_uploadsFolder}': {ex.Message}");
                // No lanzar excepción aquí, solo registrar el error
            }
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("El archivo no puede estar vacío");

            if (file.Length > MaxFileSize)
                throw new ArgumentException($"El archivo no puede superar {MaxFileSize / (1024 * 1024)}MB");

            var extension = Path.GetExtension(file.FileName).ToLower();
            if (!_allowedExtensions.Contains(extension))
                throw new ArgumentException("Solo se permiten archivos de imagen (jpg, jpeg, png, gif)");

            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(_uploadsFolder, fileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                Console.WriteLine($"[INFO] Archivo subido: {fileName}");
                // Retornar la ruta relativa pública para acceso web
                return $"uploads/galeria/{fileName}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Error al subir archivo: {ex.Message}");
                throw new InvalidOperationException($"Error al subir la imagen: {ex.Message}", ex);
            }
        }

        public void DeleteImage(string fileSrc)
        {
            if (string.IsNullOrEmpty(fileSrc))
                return;

            try
            {
                // Extraer nombre del archivo de la ruta (ej: "uploads/galeria/abc123.jpg" -> "abc123.jpg")
                var fileName = Path.GetFileName(fileSrc);
                var filePath = Path.Combine(_uploadsFolder, fileName);
                
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                    Console.WriteLine($"[INFO] Archivo eliminado: {fileName}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Error al eliminar archivo '{fileSrc}': {ex.Message}");
            }
        }
    }
}
