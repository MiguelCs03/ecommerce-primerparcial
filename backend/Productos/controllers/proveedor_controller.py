from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Productos.models import Proveedor
from Productos.serializers import ProveedorSerializer
from django.shortcuts import get_object_or_404


class ProveedorListaCrearVista(APIView):
    def get(self, request):
        """
        Listar todos los proveedores (GET)
        """
        proveedores = Proveedor.objects.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Crear nuevo proveedor (POST)
        """
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProveedorDetalleVista(APIView):
    def get(self, request, pk):
        """
        Obtener proveedor por ID (GET)
        """
        proveedor = get_object_or_404(Proveedor, pk=pk)
        serializer = ProveedorSerializer(proveedor)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Actualizar proveedor por ID (PUT)
        """
        proveedor = get_object_or_404(Proveedor, pk=pk)
        serializer = ProveedorSerializer(proveedor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Eliminar proveedor por ID (DELETE)
        """
        proveedor = get_object_or_404(Proveedor, pk=pk)
        proveedor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
