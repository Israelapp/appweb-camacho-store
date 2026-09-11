import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="es">
      <body className={`${inter.className} pl-64`}>
    
        {children}
    
        <Sidebar /> 
          

      </body>
    </html>
  );
}