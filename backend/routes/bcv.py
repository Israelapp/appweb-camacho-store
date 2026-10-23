from flask import Blueprint, jsonify
import requests
from bs4 import BeautifulSoup
import time

bcv_bp = Blueprint('bcv', __name__, url_prefix='/api/bcv')

# Variables para la caché en memoria
_cache_tasa = {
    "tasa": None,
    "timestamp": 0
}

# Tiempo de expiración de la caché en segundos (Ej: 4 horas = 14400 segundos)
CACHE_DURATION = 14400 

@bcv_bp.route('/tasa', methods=['GET'])
def obtener_tasa_bcv():
    global _cache_tasa
    tiempo_actual = time.time()

    # Si tenemos una tasa guardada y no ha expirado, la devolvemos directamente
    if _cache_tasa["tasa"] is not None and (tiempo_actual - _cache_tasa["timestamp"] < CACHE_DURATION):
        return jsonify({
            "success": True,
            "moneda": "USD",
            "tasa": _cache_tasa["tasa"],
            "fuente": "Banco Central de Venezuela (Caché)",
            "cached": True
        }), 200

    try:
        # Petición a la página oficial del Banco Central de Venezuela
        url = "https://www.bcv.org.ve/"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
        
        # Desactivamos verify=False por seguridad local, pero mantenemos el timeout
        response = requests.get(url, headers=headers, verify=False, timeout=10)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extraer contenedor del dólar en la web del BCV
            dolar_container = soup.find('div', id='dolar')
            if dolar_container:
                rate_text = dolar_container.find('strong').text.strip()
                rate_value = float(rate_text.replace(',', '.'))
                
                # Actualizamos la caché
                _cache_tasa["tasa"] = rate_value
                _cache_tasa["timestamp"] = tiempo_actual
                
                return jsonify({
                    "success": True,
                    "moneda": "USD",
                    "tasa": rate_value,
                    "fuente": "Banco Central de Venezuela",
                    "cached": False
                }), 200
        
        # Si falla el scraping pero tenemos una tasa vieja en caché, es mejor devolverla antes que dar error
        if _cache_tasa["tasa"] is not None:
            return jsonify({
                "success": True,
                "moneda": "USD",
                "tasa": _cache_tasa["tasa"],
                "fuente": "Banco Central de Venezuela (Caché de respaldo por fallo)",
                "cached": True
            }), 200

        return jsonify({"success": False, "error": "No se pudo obtener la tasa de la web del BCV"}), 502

    except Exception as e:
        # Si ocurre un error de conexión y hay caché previa, salvamos la petición
        if _cache_tasa["tasa"] is not None:
            return jsonify({
                "success": True,
                "moneda": "USD",
                "tasa": _cache_tasa["tasa"],
                "fuente": "Banco Central de Venezuela (Caché de emergencia)",
                "cached": True
            }), 200
            
        return jsonify({"success": False, "error": str(e)}), 500