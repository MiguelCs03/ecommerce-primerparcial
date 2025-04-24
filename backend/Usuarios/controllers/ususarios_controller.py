# Importaciones necesarias para manejar peticiones API, respuestas, estados HTTP y permisos
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
# Importamos el modelo Usuario y su serializer
from Usuarios.models import Usuario
from Usuarios.serializers import UsuarioSerializer

# Vista para obtener, actualizar o eliminar un usuario específico
class UsuarioDetailView(APIView):
    # Requiere autenticación JWT para acceder a esta vista
    # permission_classes = [IsAuthenticated]

    # Método auxiliar para obtener un usuario por su ID (pk = primary key)
    def get_object(self, pk):
        try:
            return Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return None

    # Método GET para obtener la información de un usuario específico
    def get(self, request, pk):
        usuario = self.get_object(pk)  # Buscamos el usuario
        if not usuario:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UsuarioSerializer(usuario)  # Serializamos el usuario encontrado
        return Response(serializer.data)  # Devolvemos la información en formato JSON

    # Método PUT para actualizar la información de un usuario
    def put(self, request, pk):
        usuario = self.get_object(pk)  # Buscamos el usuario
        if not usuario:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UsuarioSerializer(usuario, data=request.data)  # Enviamos los datos nuevos al serializer
        if serializer.is_valid():
            serializer.save()  # Guardamos si es válido
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Si hay errores de validación

    # Método DELETE para eliminar un usuario
    def delete(self, request, pk):
        usuario = self.get_object(pk)  # Buscamos el usuario
        if not usuario:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        usuario.delete()  # Lo eliminamos
        return Response({'mensaje': 'Usuario eliminado'}, status=status.HTTP_204_NO_CONTENT)
    
    
class UsuarioStaffListView(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny] 
    def get(self, request):
    #     tipo = request.query_params.get('tipo')  # puede ser 'admin' o 'noadmin'

    #     if tipo == 'admin':
    #         usuarios = Usuario.objects.filter(is_staff=True)
    #     elif tipo == 'noadmin':
    #         usuarios = Usuario.objects.filter(is_staff=False)
    #     else:
    #         return Response({'error': 'Parámetro "tipo" inválido. Usa "admin" o "noadmin".'},
    #                         status=400)

    #     serializer = UsuarioSerializer(usuarios, many=True)
    #     return Response(serializer.data)
        return ("hola")