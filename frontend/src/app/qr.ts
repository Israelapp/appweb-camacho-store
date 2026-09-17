import QRCode from 'qrcode';

const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;
const textoWeb = 'https://tu-pagina-web.com';

// Generar el código QR en el canvas
QRCode.toCanvas(canvas, textoWeb, { width: 200 }, (error) => {
  if (error) console.error(error);
  else console.log('QR generado con éxito');
});

// Configurar la descarga
downloadBtn.addEventListener('click', () => {
  const enlace = document.createElement('a');
  enlace.download = 'codigo-qr.png';
  enlace.href = canvas.toDataURL('image/png');
  enlace.click();
});