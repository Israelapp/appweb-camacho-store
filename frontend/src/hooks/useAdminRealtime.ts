import { useEffect } from "react";

export function useAdminRealtime(
  setReservas: React.Dispatch<React.SetStateAction<any[]>>,
  mostrarNotificacion: (mensaje: string, tipo?: "exito" | "error") => void
) {
  useEffect(() => {
    // Si la variable no está disponible en el build, usa la URL de producción por defecto
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.camacho-store.com";

    // Sincronización automática (polling) con el backend cada 10 segundos
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/reservas`);
        if (response.ok) {
          const data = await response.json();
          setReservas(data);
        }
      } catch (err) {
        console.error("Error al sincronizar reservas en segundo plano:", err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [setReservas, mostrarNotificacion]);
}