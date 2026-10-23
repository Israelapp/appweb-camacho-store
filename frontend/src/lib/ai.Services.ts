import { GenerarProductoPayload, ProductoAIGenerado } from '../types';

export async function generarFichaProductoAI(payload: GenerarProductoPayload): Promise<ProductoAIGenerado> {
  const response = await fetch('http://127.0.0.1:5000/api/ai/generate-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al generar el contenido con IA');
  }

  const data: ProductoAIGenerado = await response.json();
  return data;
}