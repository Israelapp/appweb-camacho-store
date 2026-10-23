// --- Tus tipos existentes ---
export interface Reserva {
  id: number;
  cliente: string;
  litros: number; 
  estado: string;
  fecha: string | null;
}

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface Pago {
  id: number;
  cliente: string;
  monto: number;
  metodo: string;
  fecha: string | null;
}

export interface Resumen {
  total_clientes: number;
  reservas_pendientes: number;
  reservas_confirmadas: number;
  total_ingresos: number;
  total_stock: number;
}

// --- Nuevos tipos para la IA (Generador de Fichas) ---

export interface SEOMetadata {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export interface SocialMediaCopy {
  caption: string;
  hashtags: string[];
}

export interface ProductoAIGenerado {
  title: string;
  description: string;
  seo: SEOMetadata;
  social_copy: SocialMediaCopy;
}

export interface GenerarProductoPayload {
  name: string;
  category: string;
  key_features: string;
}

// types.ts (añadiendo la interfaz para la tasa)
export interface TasaBCV {
  fuente: string;
  moneda: string;
  tasa: number;
  fecha_actualizacion: string;
}