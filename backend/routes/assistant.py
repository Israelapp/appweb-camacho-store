from flask import Blueprint, request, jsonify
import os
from google import genai

assistant_bp = Blueprint('assistant', __name__)

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@assistant_bp.route('/api/assistant/chat', methods=['POST'])
def assistant_chat():
    data = request.get_json()
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "Mensaje requerido"}), 400

    try:
        prompt = f"""
        Eres el asistente virtual oficial de "Camacho Store", un negocio dedicado a la recarga y venta de agua purificada. 
        Tu objetivo es ayudar a los clientes con información sobre precios, recargas, métodos de pago y reservas de forma amable, clara y comercial.
        
        Pregunta del cliente: {user_message}
        """
        
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
        )
        
        return jsonify({"reply": response.text}), 200
    except Exception as e:
        error_str = str(e)
        print(f"Error en el asistente virtual: {error_str}")
        
        # Si Google reporta alta demanda (503), devolvemos un mensaje claro al usuario
        if "503" in error_str or "UNAVAILABLE" in error_str or "high demand" in error_str:
            return jsonify({
                "reply": "¡Hola! Nuestros servidores de asistencia están experimentando alta demanda en este momento. Por favor, intenta enviar tu mensaje de nuevo en unos segundos."
            }), 200
            
        return jsonify({"error": error_str}), 500