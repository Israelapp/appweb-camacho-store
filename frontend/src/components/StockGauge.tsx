interface StockGaugeProps {
  actual: number;
  capacidad: number;
}

export default function StockGauge({ actual, capacidad }: StockGaugeProps) {
  const porcentaje = Math.min((actual / capacidad) * 100, 100);

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 mt-3">
      <p className="text-sm font-medium text-gray-600 mb-2">Stock de agua</p>
      <div className="w-full bg-gray-100 rounded-full h-4">
        <div
          className="bg-brand h-4 rounded-full transition-all"
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{actual}L de {capacidad}L</p>
    </div>
  );
}
