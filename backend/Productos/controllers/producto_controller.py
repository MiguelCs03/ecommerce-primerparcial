from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Productos.models import Producto, Categoria, Inventario
from Productos.serializers import ProductoSerializer
from django.shortcuts import get_object_or_404


class ProductoListaCrearVista(APIView):
    """
    Vista para listar todos los productos o crear uno nuevo.
    """

    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)

    def post(self, request):
        nombre = request.data.get('nombre')
        stock = int(request.data.get('stock', 0))  # puede venir como string

        try:
            producto_existente = Producto.objects.get(nombre=nombre)
            inventario = producto_existente.inventario
            inventario.stock += stock
            inventario.save()
            serializer = ProductoSerializer(producto_existente)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Producto.DoesNotExist:
            # Si no existe, crear nuevo producto
            producto_serializer = ProductoSerializer(data=request.data)
            if producto_serializer.is_valid():
                producto = producto_serializer.save()
                Inventario.objects.create(
                    producto=producto,
                    stock=stock,  # stock inicial en 0
                    cantidad_minima=5,  # puedes ajustar estos valores
                    cantidad_maxima=100
                )
                return Response(producto_serializer.data, status=status.HTTP_201_CREATED)
            return Response(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
       
class ProductosPorCategoriaView(APIView):
    
   def get(self, request, valor):
        try:
            # Intentamos buscar la categoría por ID o nombre
            try:
                categoria = Categoria.objects.get(id=valor)
            except:
                categoria = Categoria.objects.get(nombre__iexact=valor)

            productos = Producto.objects.filter(categoria=categoria)
            serializer = ProductoSerializer(productos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Categoria.DoesNotExist:
            return Response({'error': 'Categoría no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        