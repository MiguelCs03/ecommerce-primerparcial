# backend/Productos/openai_controller.py
import os
import requests
from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
