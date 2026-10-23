'use client';

import { useState } from 'react';
import { generarFichaProductoAI } from '../../lib/ai.Services';
import { ProductoAIGenerado } from '../../types';

export default function GeneradorAI() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<ProductoAIGenerado | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !caracteristicas) {
      setError('Por favor, completa al menos el nombre y las características.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await generarFichaProductoAI({
        name: nombre,

        category: categoria || 'General',
        key_features: caracteristicas,
      });
      setResultado(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-gray-800">✨ Generador de Fichas con IA</h3>
      
      <form onSubmit={handleGenerar} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Nombre del Producto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Filtro de Agua Industrial Pro"
            className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Categoría</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ej. Purificación"
            className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Características Principales</label>
          <textarea
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
            placeholder="Ej. Acero inoxidable, 3 etapas de filtración, bajo mantenimiento..."
            rows={3}
            className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand text-white py-2.5 px-4 rounded-lg font-bold hover:bg-brand-dark transition-colors disabled:opacity-50 text-sm"
        >
          {loading ? 'Generando contenido con IA...' : 'Generar Ficha'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3 text-sm text-center">{error}</p>}

      {resultado && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
          <h4 className="font-bold text-base text-gray-800">{resultado.title}</h4>
          <p className="text-sm text-gray-600">{resultado.description}</p>
          
          <div className="border-t pt-3 mt-3 space-y-2">
            <div>
              <h5 className="font-semibold text-xs text-gray-500 uppercase">SEO Meta Title</h5>
              <p className="text-sm text-gray-800">{resultado.seo.meta_title}</p>
            </div>
            
            <div>
              <h5 className="font-semibold text-xs text-gray-500 uppercase">Keywords</h5>
              <p className="text-sm text-gray-800">{resultado.seo.keywords.join(', ')}</p>
            </div>

            <div>
              <h5 className="font-semibold text-xs text-gray-500 uppercase">Redes Sociales (Caption)</h5>
              <p className="text-sm text-gray-800">{resultado.social_copy.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}