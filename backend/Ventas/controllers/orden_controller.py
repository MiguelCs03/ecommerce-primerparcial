from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models.venta_model import Orden
from Ventas.serializers.venta_serializer import OrdenSerializer


class OrdenListCreateAPIView(APIView):
    def get(self, request):
        ordenes = Orden.objects.all()
        serializer = OrdenSerializer(ordenes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrdenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrdenRetrieveUpdateDestroyAPIView(APIView):
    def get_object(self, pk):
        try:
            return Orden.objects.get(pk=pk)
        except Orden.DoesNotExist:
            return None

    def get(self, request, pk):
        orden = self.get_object(pk)
        if not orden:
            return Response({'error': 'Orden no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrdenSerializer(orden)
        return Response(serializer.data)

    def put(self, request, pk):
        orden = self.get_object(pk)
        if not orden:
            return Response({'error': 'Orden no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrdenSerializer(orden, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        orden = self.get_object(pk)
        if not orden:
            return Response({'error': 'Orden no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        orden.delete()
        return Response({'mensaje': 'Orden eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)
