import { useEffect } from "react";

export function useAdminRealtime(
  setReservas: React.Dispatch<React.SetStateAction<any[]>>,
  mostrarNotificacion: (mensaje: string, tipo?: "exito" | "error") => void
) {
  useEffect(() => {
    // Sincronización automática (polling) con el backend de Flask cada 10 segundos
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:5000/reservas");
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