"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrDescarga() {
  const [url, setUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (url && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: 200 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [url]);

 function handleDownload() {
  if (!canvasRef.current) return;
  const enlace = document.createElement("a");
  enlace.href = canvasRef.current.toDataURL("image/png");
  enlace.download = "camacho-store-qr.png";
  enlace.click();
}

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 mt-3 flex flex-col items-center">
      <p className="text-sm font-medium text-gray-600 mb-2">Accede a la app desde tu móvil</p>
      <canvas  ref={canvasRef} />
      <button
        onClick={handleDownload}
        className="mt-3 bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors"
      >
        Descargar QR
      </button>
    </div>
  );
}