import os
import requests
from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import OrdenItem
from Productos.models import Producto
from Productos.serializers import ProductoSerializer
from django.db.models import Count

load_dotenv()

@api_view(['GET'])
def recomendar_productos_por_usuario(request, usuario_id):
    # Obtener historial de productos del usuario
    items = OrdenItem.objects.filter(orden__usuario_id=usuario_id)
    
    if not items.exists():
        return Response({"error": "Este usuario no tiene historial de compras."}, status=status.HTTP_404_NOT_FOUND)

    productos_comprados = list(items.values_list('producto__nombre', flat=True))
    texto_historial = ', '.join(productos_comprados)

    prompt = f"""
    Un cliente ha comprado los siguientes productos: {texto_historial}.
    Con base en estos gustos, recomienda 3 productos similares o complementarios disponibles en la tienda.
    Devuelve solo una lista separada por comas (sin texto adicional).
    """

    headers = {
        'Authorization': f'Bearer {os.getenv("OPENAI_API_KEY")}',
        'Content-Type': 'application/json',
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Eres un recomendador de productos para un sistema de ventas."},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
        result = response.json()
        respuesta = result.get("choices", [{}])[0].get("message", {}).get("content", "")
        print("Respuesta de OpenAI:", respuesta)


        # Buscar productos que coincidan con la respuesta
        posibles = [p.strip().lower() for p in respuesta.split(',')]
        from django.db.models import Q
        query = Q()
        for termino in posibles:
            query |= Q(nombre__icontains=termino)

        recomendados = Producto.objects.filter(query).distinct()[:3]
        serializer = ProductoSerializer(recomendados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
