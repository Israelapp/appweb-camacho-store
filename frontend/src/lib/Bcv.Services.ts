export interface BCVResponse {
  success: boolean;
  moneda: string;
  tasa: number;
  fuente: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function obtenerTasaBCV(): Promise<number> {
  if (!API_URL) {
    console.error('Falta la variable NEXT_PUBLIC_API_URL');
    return 0;
  }

  try {
    const response = await fetch(`${API_URL}/api/bcv/tasa`, {
      cache: 'no-store', // Para obtener siempre el precio actualizado
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