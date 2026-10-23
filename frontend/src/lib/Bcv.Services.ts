export interface BCVResponse {
  success: boolean;
  moneda: string;
  tasa: number;
  fuente: string;
}

export async function obtenerTasaBCV(): Promise<number> {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/bcv/tasa', {
      cache: 'no-store' // Para obtener siempre el precio actualizado
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener la tasa del BCV');
    }

    const data: BCVResponse = await response.json();
    return data.tasa;
  } catch (error) {
    console.error('Error al conectar con la API BCV:', error);
    return 0; // O un valor de respaldo por defecto
  }
}