from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import Venta
from Ventas.serializers import VentaSerializer
from Productos.models import Inventario, Producto	

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import Venta
from Ventas.serializers import VentaSerializer
from Productos.models import Inventario
from django.db import transaction


class VentaListCreateAPIView(APIView):
    def get(self, request):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(ventas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = VentaSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                venta = serializer.save()

                orden_items = venta.orden.items.all()
                errores = []

                for item in orden_items:
                    producto = item.producto
                    cantidad = item.cantidad

                    try:
                        inventario = Inventario.objects.get(producto=producto)
                    except Inventario.DoesNotExist:
                        errores.append(f"No hay inventario para el producto '{producto.nombre}'.")
                        continue

                    if inventario.stock < cantidad:
                        errores.append(f"Stock insuficiente para '{producto.nombre}' (Stock: {inventario.stock}, Requerido: {cantidad}).")
                        continue

                if errores:
                    venta.delete()  # Revertir venta si hay errores
                    return Response({"error": errores}, status=status.HTTP_400_BAD_REQUEST)

                # Si no hay errores, restar stock
                for item in orden_items:
                    inventario = Inventario.objects.get(producto=item.producto)
                    inventario.stock -= item.cantidad
                    inventario.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VentaRetrieveUpdateDestroyAPIView(APIView):
    def get_object(self, pk):
        try:
            return Venta.objects.get(pk=pk)
        except Venta.DoesNotExist:
            return None

    def get(self, request, pk):
        venta = self.get_object(pk)
        if not venta:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = VentaSerializer(venta)
        return Response(serializer.data)

    def put(self, request, pk):
        venta = self.get_object(pk)
        if not venta:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = VentaSerializer(venta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        venta = self.get_object(pk)
        if not venta:
            return Response({'error': 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        venta.delete()
        return Response({'mensaje': 'Venta eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)
