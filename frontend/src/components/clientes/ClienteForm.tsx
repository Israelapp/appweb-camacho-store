"use client"

import {useState} from "react"

import{ useRouter} from "next/navigation"


export default function ClienteForm(){
    const router = useRouter();
    const [nombre,setNombre] = useState ("");
    const [telefono,setTelefono] = useState ("");
    const [direccion,setDireccion] = useState ("");

    async function handleSubmit (e:React.FormEvent)
    {
        e.preventDefault()
        await fetch ("http://127.0.0.1:5000/api/clientes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify ({ nombre, telefono, direccion }),
        });

        setNombre ("");
        setTelefono("");
        setDireccion("");
    }

        return (
< form onSubmit= {handleSubmit} className =  "flex flex-col gap-2 p-4">
    <input 
     type="text"
     value={nombre}
     onChange={(e)  => setNombre (e.target.value)} 
     placeholder="Nombre"
     className="border p-2"
     />

     <input 
     type="text" 
     value={telefono}
     onChange={(e) => setTelefono(e.target.value)}
     placeholder="Telefono"
     className="border p-2"
     />

    <input 
    type="text" 
    value={direccion}
    onChange={(e) => setDireccion (e.target.value)}
    placeholder="Direccion"
    className="border p-2"
    />

    <button type="submit" className="bg-blue-600 text-white p-2"> 
        Cliente Nuevo
    </button>

</form>
 );
}

