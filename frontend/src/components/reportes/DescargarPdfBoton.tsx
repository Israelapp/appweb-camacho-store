"use client";


export default function DescargarPdfBoton() {
  async function handleDownload() {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reportes/resumen/pdf`);
    const blob = await respuesta.blob();
    const url = window.URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "reporte.pdf";
    enlace.click();

    window.URL.revokeObjectURL(url);
  }

  return (
    <div>
      <button onClick={handleDownload} className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
        Descargar PDF
      </button>

    </div>

  );
}