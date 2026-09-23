// src/app/admin/pago/page.tsx
import PagoForm from "../../../components/pagos/PagoForm";
import PagoCard from "../../../components/pagos/PagoCard";
import { Pago } from "../../../types";

async function obtenerPagos(): Promise<Pago[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pago`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPagosPage() {
  const pagos = await obtenerPagos();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Formulario a la izquierda */}
      <div className="lg:col-span-1">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Registrar Nuevo Pago</h2>
        <PagoForm />
      </div>

      {/* Lista de PagoCards a la derecha */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Historial de Pagos</h2>
        {pagos.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay pagos registrados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pagos.map((pago) => (
              <PagoCard key={pago.id} pago={pago} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}