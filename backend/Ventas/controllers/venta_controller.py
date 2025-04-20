from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import Venta
from Ventas.serializers import VentaSerializer
from Productos.models import Inventario, Producto	



class VentaListCreateAPIView(APIView):
    def get(self, request):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(ventas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = VentaSerializer(data=request.data)
        if serializer.is_valid():
            venta = serializer.save()

            # Buscar el inventario del producto
            try:
                inventario = Inventario.objects.get(producto=venta.producto)
            except Inventario.DoesNotExist:
                return Response(
                    {"error": "No hay inventario para este producto."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Verificar si hay suficiente stock
            if inventario.stock < venta.cantidad:
                venta.delete()  # revertir la venta
                return Response(
                    {"error": "Stock insuficiente."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Restar del stock
            inventario.stock -= venta.cantidad
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
