"use client";

import { useState } from "react";

export default function DescargarPdfBoton() {
  const [cargando, setCargando] = useState(false);

  async function handleDownload() {
    setCargando(true);

    try {
      const respuesta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reportes/resumen/pdf`
      );

      if (!respuesta.ok) {
        throw new Error(`Error en el servidor: ${respuesta.statusText}`);
      }

      const blob = await respuesta.blob();
      const url = window.URL.createObjectURL(blob);

      // Obtener fecha actual en formato YYYY-MM-DD
      const hoy = new Date();
      const fechaFormateada = hoy.toISOString().split("T")[0];

      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = `reporte-${fechaFormateada}.pdf`;

      document.body.appendChild(enlace);
      enlace.click();

      document.body.removeChild(enlace);
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      alert("No se pudo generar el reporte PDF. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={cargando}
        className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
      >
        {cargando ? "Generando PDF..." : "Descargar PDF"}
      </button>
    </div>
  );
}