import os
import time

from flask import Blueprint, request, jsonify
from google import genai
from google.genai import types
from google.genai.errors import APIError
import pydantic

ai_bp = Blueprint('ai', __name__)
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("Falta la variable de entorno GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


class SEOMetadata(pydantic.BaseModel):
    meta_title: str = pydantic.Field(description="Título SEO para Google, máximo 60 caracteres")
    meta_description: str = pydantic.Field(description="Descripción SEO para Google, máximo 155 caracteres")
    keywords: list[str] = pydantic.Field(description="5 palabras clave SEO relevantes")


class SocialMediaCopy(pydantic.BaseModel):
    caption: str = pydantic.Field(description="Texto promocional con emojis")
    hashtags: list[str] = pydantic.Field(description="Hashtags sin el símbolo #")


class ProductCardResponse(pydantic.BaseModel):
    title: str = pydantic.Field(description="Título comercial atrayente")
    description: str = pydantic.Field(description="Descripción detallada")
    seo: SEOMetadata
    social_copy: SocialMediaCopy


@ai_bp.route('/generate-product', methods=['POST'])
def generate_product():
    data = request.get_json() or {}
    name = data.get('name')
    category = data.get('category', 'General')
    key_features = data.get('key_features')

    if not name or not key_features:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    prompt = (
        f"Genera la ficha de producto en español para: "
        f"Nombre: {name}, Categoría: {category}, Características: {key_features}"
    )

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=ProductCardResponse,
                ),
            )
            return response.text, 200, {'Content-Type': 'application/json'}
        except APIError as e:
            if e.code == 503 and attempt < max_retries - 1:
                time.sleep(2)
                continue
            print(f"Error de Gemini: {e}")
            return jsonify({'error': 'Error al generar la ficha. Inténtalo de nuevo.'}), 500
        except Exception as e:
            print(f"Error inesperado: {e}")
            return jsonify({'error': 'Error interno del servidor.'}), 500