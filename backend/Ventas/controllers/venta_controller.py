from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import Venta
from Ventas.serializers import VentaSerializer



class VentaListCreateAPIView(APIView):
    def get(self, request):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(ventas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
