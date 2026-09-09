import {Pago} from "../../types";
import PagoForm from "../../components/pagos/PagoForm";
import PagoCard from "../../components/pagos/PagoCard";

export default async function pago() {

    const respuesta = await fetch ("http://127.0.0.1:5000/api/pagos");
    const datos = await respuesta.json();
    console.log(datos);

    return(

        <div>
            <h1 className="text-2xl font-bold text-gray-800 p-4 pb-0">Pagos</h1>
            <PagoForm/>
            {datos.map ((pago: Pago) => (
                <PagoCard key= {pago.id}  pago ={pago} />
            ))}
        </div>
    )
    
}