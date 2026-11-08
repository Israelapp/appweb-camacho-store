import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useAdminRealtime(
  setReservas: React.Dispatch<React.SetStateAction<any[]>>,
  mostrarNotificacion: (mensaje: string, tipo?: "exito" | "error") => void
) {
  useEffect(() => {
    const channel = supabase
      .channel("admin-realtime-reservas")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reservas" },
        (payload) => {
          const nuevaReserva = payload.new;
          setReservas((prev) => [nuevaReserva, ...prev]);
          mostrarNotificacion(`¡Nueva reserva de ${nuevaReserva.cliente} (${nuevaReserva.litros}L)!`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setReservas, mostrarNotificacion]);
}