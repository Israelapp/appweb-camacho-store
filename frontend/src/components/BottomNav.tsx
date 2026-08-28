

import Link from "next/link";


export default function BottomNav(){
    return (
    <div>
        <Link href="/">Reservas</Link>
        <Link href="/inventario">Inventario</Link>
        <Link href="/reportes">Reportes</Link>
        <Link href="/clientes">Clientes</Link>
    </div>
    );
}



