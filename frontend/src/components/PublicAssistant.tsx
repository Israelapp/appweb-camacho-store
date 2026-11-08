'useState';
import { useState } from 'react';

export default function PublicAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: '¡Hola! Soy el asistente virtual de Camacho Store. ¿En qué puedo ayudarte hoy con nuestros productos o precios?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('https://api.camacho-store.com/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply || 'Lo siento, no pude procesar tu consulta.' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error de conexión con el asistente.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
        >
          💬 Pregúntale al Asistente
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col h-[450px]">
          <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">Asistente Camacho Store</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border border-gray-200 shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400 italic">Escribiendo respuesta...</div>}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white rounded-b-2xl flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Consulta un precio o producto..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}