"use client"

import { useState} from "react";
import {useRouter} from "next/navigation"

export default function PagoForm () {
    const router = useRouter();
    const [cliente, setCliente] = useState ("");
    const [monto,  setMonto] = useState (0);
    const [metodo, setMetodo] = useState ("");
    const [fecha, setFecha] = useState ("");


    async function handleSubmit (e:React.FormEvent) {
        e.preventDefault();


        await fetch ("http://127.0.0.1:5000/api/pagos", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({cliente, monto, metodo, fecha}),

        });

        setCliente ("");
        setMonto(0);
        setMetodo("");
        setFecha ("");
        router.refresh ();
        
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
            <input type="text" 
            value={cliente} 
            onChange= {(e) => setCliente (e.target.value)}
            placeholder="Cliente"
           className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"           
            />

            <input type="text" 
            value={monto} 
            onChange={(e) => setMonto(Number(e.target.value))}
            placeholder="Monto"
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input type="text"
            value={metodo} 
            onChange={(e) => setMetodo (e.target.value)}
            placeholder="Metodo"
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
             <input type="text" 
             value={fecha} 
             onChange={(e) => setFecha (e.target.value)} 
             placeholder="Fecha"
             className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

             <button type= "submit" className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
                
                Realizar Pago
             </button>
        </form>
    );
}