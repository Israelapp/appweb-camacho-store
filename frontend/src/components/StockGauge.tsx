'use client';

import { useState } from 'react';

interface StockGaugeProps {
  litrosReservados?: number; // Viene de la suma de reservas de Supabase
}

export default function StockGauge({ litrosReservados = 0 }: StockGaugeProps) {
  // Capacidad configurada de los tanques
  const TANQUES_GRANDES = 3 * 3000; // 3 tanques de 3,000L = 9,000L
  const TANQUES_PEQUENOS = 2 * 1500; // 2 tanques de 1,500L = 3,000L
  const CAPACIDAD_TOTAL = TANQUES_GRANDES + TANQUES_PEQUENOS; // 12,000L

  const [capacidadManual, setCapacidadManual] = useState<number>(CAPACIDAD_TOTAL);

  // Litros disponibles reales
  const litrosDisponibles = Math.max(0, capacidadManual - litrosReservados);
  const porcentaje = Math.min(100, Math.max(0, (litrosDisponibles / CAPACIDAD_TOTAL) * 100));

  // Color de nivel dinámico
  const getColorScheme = (p: number) => {
    if (p > 50) return { bg: 'bg-cyan-500', text: 'text-cyan-600', ring: 'ring-cyan-400', badge: 'bg-cyan-50 text-cyan-700' };
    if (p > 20) return { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-400', badge: 'bg-amber-50 text-amber-700' };
    return { bg: 'bg-rose-500', text: 'text-rose-600', ring: 'ring-rose-400', badge: 'bg-rose-50 text-rose-700' };
  };

  const scheme = getColorScheme(porcentaje);

  // Calcular llenado individual simulado proporcional de los 5 tanques
  const tanques = [
    { id: 1, nombre: 'Tanque 1 (Grande)', capacidad: 3000 },
    { id: 2, nombre: 'Tanque 2 (Grande)', capacidad: 3000 },
    { id: 3, nombre: 'Tanque 3 (Grande)', capacidad: 3000 },
    { id: 4, nombre: 'Tanque 4 (Auxiliar)', capacidad: 1500 },
    { id: 5, nombre: 'Tanque 5 (Auxiliar)', capacidad: 1500 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-5">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            💧 Nivel de Tanques de Agua
          </h3>
          <p className="text-xs text-gray-400">Capacidad total del sistema: {CAPACIDAD_TOTAL.toLocaleString()} Litros</p>
        </div>
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${scheme.badge}`}>
          {porcentaje.toFixed(1)}% Lleno
        </span>
      </div>

      {/* Indicador Principal e Hidrómetro Visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-gray-50 p-5 rounded-xl border border-gray-100">
        
        {/* Nivel de Agua en Tanque Animado */}
        <div className="flex justify-center">
          <div className="relative w-32 h-40 bg-gray-200 rounded-2xl overflow-hidden border-4 border-white shadow-inner flex flex-col justify-end">
            {/* Animación del Agua */}
            <div
              className={`w-full transition-all duration-700 ease-out ${scheme.bg} opacity-85 relative`}
              style={{ height: `${porcentaje}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 animate-pulse"></div>
            </div>

            {/* Medidor numérico flotante */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center drop-shadow-md">
              <span className="text-xl font-black text-gray-900 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {litrosDisponibles.toLocaleString()} L
              </span>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Disponible</span>
            </div>
          </div>
        </div>

        {/* Resumen Métrico */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Agua Disponible</span>
              <span className="text-lg font-black text-gray-800">{litrosDisponibles.toLocaleString()} L</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Agua Reservada</span>
              <span className="text-lg font-black text-amber-600">{litrosReservados.toLocaleString()} L</span>
            </div>
          </div>

          {/* Barra de progreso global */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-gray-500">
              <span>0 L</span>
              <span>{CAPACIDAD_TOTAL.toLocaleString()} L</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${scheme.bg}`}
                style={{ width: `${porcentaje}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Desglose Individual por Tanque Físico */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Distribución Física de Tanques (5 Unidades)</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {tanques.map((t) => {
            // Proporción simulada por tanque basada en el porcentaje global
            const litrosTanque = Math.round((t.capacidad * porcentaje) / 100);
            return (
              <div key={t.id} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-500 truncate">{t.nombre}</span>
                <span className="text-xs font-black text-gray-800">{litrosTanque.toLocaleString()} L</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full ${scheme.bg}`}
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
                <span className="text-[9px] text-gray-400">Cap: {t.capacidad.toLocaleString()}L</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}