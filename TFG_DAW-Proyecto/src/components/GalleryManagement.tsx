import React, { useState, useEffect } from 'react';

interface Imagen {
  id: number;
  src: string;
  categoria: string;
  title: string;
  description: string;
  height: number;
}

interface EditingForm {
  id: number;
  archivo?: File | null;
  categoria: string;
  title: string;
  description: string;
  height: number;
  srcPreview?: string;
}

const GalleryManagement: React.FC = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingImage, setEditingImage] = useState<EditingForm | null>(null);
  const [createFormData, setCreateFormData] = useState({
    archivo: null as File | null,
    archivoPreview: null as string | null,
    categoria: '',
    title: '',
    description: '',
    height: 400,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = 'http://localhost:5047';

  // Fetch imagenes
  const fetchImagenes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/galeria`);
      if (!response.ok) throw new Error('Error al obtener imágenes');
      const data: Imagen[] = await response.json();
      setImagenes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagenes();
  }, []);

  // Manejar cambio de archivo en crear
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCreateFormData({
          ...createFormData,
          archivo: file,
          archivoPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar cambio de archivo en editar
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingImage(prev => prev ? {
          ...prev,
          archivo: file,
          srcPreview: reader.result as string,
        } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Abrir modal de edición
  const handleEdit = (imagen: Imagen) => {
    setEditingImage({
      id: imagen.id,
      archivo: null,
      categoria: imagen.categoria,
      title: imagen.title,
      description: imagen.description,
      height: imagen.height,
      srcPreview: `${API_URL}/${imagen.src}`,
    });
    setShowEditModal(true);
  };

  // Guardar cambios de imagen
  const handleSaveEdit = async () => {
    if (!editingImage) return;
    try {
      const formData = new FormData();
      if (editingImage.archivo) {
        formData.append('Archivo', editingImage.archivo);
      }
      formData.append('Categoria', editingImage.categoria);
      formData.append('Title', editingImage.title);
      formData.append('Description', editingImage.description);
      formData.append('Height', editingImage.height.toString());

      const response = await fetch(`${API_URL}/api/galeria/${editingImage.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al actualizar imagen');

      setShowEditModal(false);
      setSuccessMessage('Imagen actualizada correctamente');
      fetchImagenes();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Crear nueva imagen
  const handleCreateImage = async () => {
    try {
      if (!createFormData.archivo) {
        setError('Debes seleccionar un archivo');
        return;
      }

      const formData = new FormData();
      formData.append('Archivo', createFormData.archivo);
      formData.append('Categoria', createFormData.categoria);
      formData.append('Title', createFormData.title);
      formData.append('Description', createFormData.description);
      formData.append('Height', createFormData.height.toString());

      const response = await fetch(`${API_URL}/api/galeria/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear imagen');
      }

      setShowCreateModal(false);
      setCreateFormData({
        archivo: null,
        archivoPreview: null,
        categoria: '',
        title: '',
        description: '',
        height: 400,
      });
      setSuccessMessage('Imagen añadida correctamente');
      setError(null);
      fetchImagenes();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Eliminar imagen
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) return;
    try {
      const response = await fetch(`${API_URL}/api/galeria/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar imagen');

      setSuccessMessage('Imagen eliminada correctamente');
      fetchImagenes();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      
      {/* Header del Dashboard */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-8 gap-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-sm"></i> Nueva Imagen
        </button>
      </div>

      {/* Tabla de imágenes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
            <p className="text-slate-500 font-medium">Cargando imágenes...</p>
          </div>
        ) : imagenes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50">
            <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <i className="fa-solid fa-images text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No hay imágenes</h3>
            <p className="text-slate-500 mt-1 text-center max-w-sm">Aún no has subido ninguna imagen. ¡Crea la primera!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Imagen</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {imagenes.map((imagen) => (
                  <tr key={imagen.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                    <td className="px-6 py-4">
                      <img src={`${API_URL}/${imagen.src}`} alt={imagen.title} className="h-12 w-12 rounded object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{imagen.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{imagen.categoria}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(imagen)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2 focus:outline-none"
                        title="Editar"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(imagen.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                        title="Eliminar"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Reutilizable para Formulario (Se usa en Crear y Editar) */}
      {(showEditModal || showCreateModal) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 scale-100">
            {/* Header del Modal */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {showEditModal ? 'Editar Imagen' : 'Nueva Imagen'}
              </h2>
              <button 
                onClick={() => { setShowEditModal(false); setShowCreateModal(false); }}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-full p-2 transition-colors focus:outline-none"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Input de archivo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Selecciona una imagen *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={showEditModal ? handleEditFileChange : handleFileChange}
                    className="hidden"
                    id={showEditModal ? "edit-file-input" : "create-file-input"}
                  />
                  <label
                    htmlFor={showEditModal ? "edit-file-input" : "create-file-input"}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors text-sm text-slate-600 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-image"></i>
                    {showEditModal ? (editingImage?.archivo ? editingImage.archivo.name : 'Cambiar imagen') : (createFormData.archivo ? createFormData.archivo.name : 'Seleccionar archivo')}
                  </label>
                </div>
                {(showEditModal ? editingImage?.srcPreview : createFormData.archivoPreview) && (
                  <div className="mt-3 relative">
                    <img
                      src={showEditModal ? editingImage?.srcPreview : createFormData.archivoPreview || ''}
                      alt="Preview"
                      className="h-32 w-32 rounded-lg object-cover border border-slate-200"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Título *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <i className="fa-solid fa-heading"></i>
                    </div>
                    <input
                      type="text"
                      value={showEditModal ? editingImage?.title : createFormData.title}
                      onChange={(e) => showEditModal
                        ? setEditingImage(prev => prev ? { ...prev, title: e.target.value } : null)
                        : setCreateFormData({ ...createFormData, title: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      placeholder="Mi Proyecto"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoría *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <i className="fa-solid fa-tag"></i>
                    </div>
                    <input
                      type="text"
                      value={showEditModal ? editingImage?.categoria : createFormData.categoria}
                      onChange={(e) => showEditModal
                        ? setEditingImage(prev => prev ? { ...prev, categoria: e.target.value } : null)
                        : setCreateFormData({ ...createFormData, categoria: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      placeholder="UI/UX, Branding, Web"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-solid fa-align-left"></i>
                  </div>
                  <textarea
                    value={showEditModal ? editingImage?.description : createFormData.description}
                    onChange={(e) => showEditModal
                      ? setEditingImage(prev => prev ? { ...prev, description: e.target.value } : null)
                      : setCreateFormData({ ...createFormData, description: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    rows={3}
                    placeholder="Describe tu proyecto..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Altura (píxeles)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-solid fa-maximize"></i>
                  </div>
                  <input
                    type="number"
                    value={showEditModal ? editingImage?.height : createFormData.height}
                    onChange={(e) => showEditModal
                      ? setEditingImage(prev => prev ? { ...prev, height: parseInt(e.target.value) } : null)
                      : setCreateFormData({ ...createFormData, height: parseInt(e.target.value) })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    placeholder="400"
                  />
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              <button
                onClick={() => { setShowEditModal(false); setShowCreateModal(false); }}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Cancelar
              </button>
              <button
                onClick={showEditModal ? handleSaveEdit : handleCreateImage}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {showEditModal ? 'Guardar Cambios' : 'Añadir Imagen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
