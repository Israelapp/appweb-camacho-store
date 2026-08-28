import BottomNav from '../components/BottomNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="es">
      <body>
    
        {children}
    
        <BottomNav /> 
          
          
          
     


      </body>
    </html>
  );
}