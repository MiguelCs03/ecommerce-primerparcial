from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ventas.models import Estado
from Ventas.serializers import EstadoSerializer


class EstadoListCreateAPIView(APIView):
    def get(self, request):
        estados = Estado.objects.all()
        serializer = EstadoSerializer(estados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EstadoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EstadoRetrieveUpdateDestroyAPIView(APIView):
    def get_object(self, pk):
        try:
            return Estado.objects.get(pk=pk)
        except Estado.DoesNotExist:
            return None

    def get(self, request, pk):
        estado = self.get_object(pk)
        if not estado:
            return Response({'error': 'Estado no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EstadoSerializer(estado)
        return Response(serializer.data)

    def put(self, request, pk):
        estado = self.get_object(pk)
        if not estado:
            return Response({'error': 'Estado no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EstadoSerializer(estado, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        estado = self.get_object(pk)
        if not estado:
            return Response({'error': 'Estado no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        estado.delete()
        return Response({'mensaje': 'Estado eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
