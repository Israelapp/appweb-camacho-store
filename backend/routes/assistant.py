from flask import Blueprint, request, jsonify
import os
from google import genai

assistant_bp = Blueprint('assistant', __name__)

# Inicializar el cliente de Google GenAI
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@assistant_bp.route('/api/assistant/chat', methods=['POST'])
def assistant_chat():
    data = request.get_json()
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "Mensaje requerido"}), 400

    try:
        # Prompt base para el asistente virtual público de Camacho Store
        prompt = f"""
        Eres el asistente virtual oficial de "Camacho Store", un negocio dedicado a la recarga y venta de agua purificada. 
        Tu objetivo es ayudar a los clientes con información sobre precios, recargas, métodos de pago y reservas de forma amable, clara y comercial.
        
        Pregunta del cliente: {user_message}
        """
        
        # Usamos un modelo válido y estable (gemini-1.5-flash)
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt,
        )
        
        return jsonify({"reply": response.text}), 200
    except Exception as e:
        # Imprime el error exacto en la terminal de Flask para depurar fácilmente
        print(f"Error en el asistente virtual: {str(e)}")
        return jsonify({"error": str(e)}), 500