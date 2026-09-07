import "./globals.css";
import BottomNav from '../components/BottomNav';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="es">
      <body className={`${inter.className} pb-20`}>
    
        {children}
    
        <BottomNav /> 
          

      </body>
    </html>
  );
}