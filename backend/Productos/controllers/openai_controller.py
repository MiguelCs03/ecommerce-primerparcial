# backend/Productos/openai_controller.py
import os
import requests
from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response
from Productos.models import Producto
from Productos.serializers import ProductoSerializer
from rest_framework import status
from rest_framework.parsers import JSONParser


load_dotenv()

@api_view(['POST'])
def recomendar_productos(request):
    prompt = request.data.get("prompt", "Quiero una recomendación de productos")

    headers = {
        'Authorization': f'Bearer {os.getenv("OPENAI_API_KEY")}',
        'Content-Type': 'application/json',
    }

    data = {
        "model": "gpt-3.5-turbo",  # puedes cambiar por "gpt-3.5-turbo" si quieres ahorrar
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)

    result = response.json()
    content = result.get("choices", [{}])[0].get("message", {}).get("content", "")

    return Response({"respuesta": content})

@api_view(['POST'])
def buscar_productos_con_ia(request):
    texto_usuario = request.data.get("texto", "")

    if not texto_usuario:
        return Response({"error": "Se requiere el campo 'texto'"}, status=status.HTTP_400_BAD_REQUEST)

    headers = {
        'Authorization': f'Bearer {os.getenv("OPENAI_API_KEY")}',
        'Content-Type': 'application/json',
    }

    prompt = f"""Interpreta qué productos quiere buscar el usuario con esta frase ambigua: '{texto_usuario}'.
Devuélveme solo una lista simple de términos de búsqueda, como: 'laptop hp', 'iphone', 'auriculares inalámbricos'."""

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Eres un asistente que interpreta búsquedas de productos para una tienda online."},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
        result = response.json()

        texto_filtrado = result.get("choices", [{}])[0].get("message", {}).get("content", "").strip().lower()

        # Extraer términos de búsqueda (una línea por término)
        terminos = [line.strip("- ").strip() for line in texto_filtrado.splitlines() if line.strip()]

        from django.db.models import Q
        query = Q()
        for termino in terminos:
            query |= Q(nombre__icontains=termino) | Q(descripcion__icontains=termino)

        productos = Producto.objects.filter(query).distinct()
        serializer = ProductoSerializer(productos, many=True)

        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
