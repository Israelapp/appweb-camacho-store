import { ImageResponse } from "next/og";

// Configuración de tamaño del favicon
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Generador dinámico del icono
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#0284c7", // Azul brillante moderno
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px", // Bordes redondeados estilo App moderna
        }}
      >
        💧
      </div>
    ),
    {
      ...size,
    }
  );
}