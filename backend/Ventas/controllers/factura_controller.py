from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import Factura
from Ventas.serializers import FacturaSerializer


class FacturaListCreateAPIView(APIView):
    def get(self, request):
        facturas = Factura.objects.all()
        serializer = FacturaSerializer(facturas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FacturaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FacturaRetrieveUpdateDestroyAPIView(APIView):
    def get_object(self, pk):
        try:
            return Factura.objects.get(pk=pk)
        except Factura.DoesNotExist:
            return None

    def get(self, request, pk):
        factura = self.get_object(pk)
        if not factura:
            return Response({'error': 'Factura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = FacturaSerializer(factura)
        return Response(serializer.data)

    def put(self, request, pk):
        factura = self.get_object(pk)
        if not factura:
            return Response({'error': 'Factura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = FacturaSerializer(factura, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        factura = self.get_object(pk)
        if not factura:
            return Response({'error': 'Factura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        factura.delete()
        return Response({'mensaje': 'Factura eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)
