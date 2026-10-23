import os
import time
from google.genai.errors import APIError
from flask import Blueprint, request, jsonify

api_key = "AQ.Ab8RN6Ls7UOVUt2mQy6ElwRB3TO5sYiLQYOJgJ2BGLNGqnLEpA"

from google import genai
from google.genai import types
import pydantic

ai_bp = Blueprint('ai', __name__)

if not api_key or "AQUÍ_PEGAS" in api_key:
    raise ValueError("Por favor pega tu clave de Gemini API dentro de la variable api_key en ia_routes.py")

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

import time

@ai_bp.route('/generate-product', methods=['POST'])
def generate_product():
    data = request.get_json() or {}
    name = data.get('name')
    category = data.get('category', 'General')
    key_features = data.get('key_features')

    if not name or not key_features:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    prompt = f"Genera la ficha de producto en español para: Nombre: {name}, Categoría: {category}, Características: {key_features}"

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model='gemini-3.8-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=ProductCardResponse,
                ),
            )
            return response.text, 200, {'Content-Type': 'application/json'}
        except Exception as e:
            error_str = str(e)
            # Si es un error 503 y aún nos quedan intentos, esperamos 2 segundos y reintentamos
            if "503" in error_str and attempt < max_retries - 1:
                time.sleep(2)
                continue
            return jsonify({'error': error_str}), 500