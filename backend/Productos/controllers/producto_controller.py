from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Productos.models import Producto
from Productos.serializers import ProductoSerializer
from django.shortcuts import get_object_or_404


class ProductoListaCrearVista(APIView):
    """
    Vista para listar todos los productos o crear uno nuevo.
    """

    def get(self, request):
        """
        Obtener la lista de todos los productos (GET)
        """
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Crear un nuevo producto (POST)
        """
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductoDetalleVista(APIView):
    """
    Vista para obtener, actualizar o eliminar un producto específico por ID.
    """

    def get(self, request, pk):
        """
        Obtener los datos de un producto por su ID (GET)
        """
        producto = get_object_or_404(Producto, pk=pk)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Actualizar todos los datos de un producto (PUT)
        """
        producto = get_object_or_404(Producto, pk=pk)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Eliminar un producto por su ID (DELETE)
        """
        producto = get_object_or_404(Producto, pk=pk)
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"mensaje": "Logout exitoso"}, status=status.HTTP_200_OK)
        # Invalidar el token de acceso