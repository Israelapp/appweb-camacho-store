import "./globals.css";
import BottomNav from '../components/BottomNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="es">
      <body className="pb-20">
    
        {children}
    
        <BottomNav /> 
          

      </body>
    </html>
  );
}