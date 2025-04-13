from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Productos.models import Categoria
from Productos.serializers import CategoriaSerializer
from django.shortcuts import get_object_or_404


class CategoriaListaCrearVista(APIView):
    def get(self, request):
        """
        Listar todas las categorías (GET)
        """
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Crear nueva categoría (POST)
        """
        serializer = CategoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoriaDetalleVista(APIView):
    def get(self, request, pk):
        """
        Obtener una categoría específica (GET)
        """
        categoria = get_object_or_404(Categoria, pk=pk)
        serializer = CategoriaSerializer(categoria)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Actualizar una categoría existente (PUT)
        """
        categoria = get_object_or_404(Categoria, pk=pk)
        serializer = CategoriaSerializer(categoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Eliminar una categoría (DELETE)
        """
        categoria = get_object_or_404(Categoria, pk=pk)
        categoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
