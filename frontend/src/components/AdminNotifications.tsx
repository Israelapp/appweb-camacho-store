"use client";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminRealtimeAlerts() {
  useEffect(() => {
    const channel = supabase
      .channel("admin-reservas-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reservas" },
        (payload) => {
          console.log("Nueva reserva detectada:", payload.new);
          // Puedes disparar un sonido, una alerta visual o un toast aquí
          alert(`🔔 ¡Nueva reserva registrada!\nCliente: ${payload.new.cliente}\nLitros: ${payload.new.cantidad}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null; // Componente invisible en segundo plano
}