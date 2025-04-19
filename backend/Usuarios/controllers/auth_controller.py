from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from Usuarios.models import Usuario, Bitacora
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


# Registro de usuario con login automático
class Register(APIView):
    def get(self, request):
        usuarios = Usuario.objects.all().values('nombre', 'correo')
        return Response(usuarios, status=status.HTTP_200_OK)
     
    def post(self, request):
        print("Datos recibidos:", request.data)
        nombre = request.data.get("nombre")
        correo = request.data.get("correo")
        contraseña = request.data.get("contraseña")
        
        if Usuario.objects.filter(correo=correo).exists():
            return Response({"error": "El correo ya está registrado"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Crear el usuario
            user = Usuario.objects.create_user(nombre=nombre, correo=correo, contraseña=contraseña)
            
            # Realizar login automáticamente
            login(request, user)
            
            # Registrar en bitácora
            ip = get_client_ip(request)
            Bitacora.objects.create(
                usuario=user,
                accion="Registro e inicio de sesión",
                ip=ip
            )
            
            # Generar tokens de acceso
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "mensaje": "Usuario registrado e iniciada sesión correctamente",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print("Error al crear usuario:", str(e))
            return Response({"error": "No se pudo registrar el usuario"}, status=status.HTTP_400_BAD_REQUEST)

# Login (sin cambios)
class Login(APIView):
    def post(self, request):
        correo = request.data.get("correo")
        contraseña = request.data.get("contraseña")
        
        user = authenticate(request, correo=correo, password=contraseña)
        if user is not None:
            login(request, user)
            
            # Bitácora
            ip = get_client_ip(request)
            Bitacora.objects.create(
                usuario=user,
                accion="Inicio de sesión",
                ip=ip
            )
            
            refresh = RefreshToken.for_user(user)
            return Response({
                "mensaje": "Login exitoso",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
    
# Logout
class Logout(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        ip = get_client_ip(request)
        Bitacora.objects.create(
            usuario=user,
            accion="Cierre de sesión",
            ip=ip
        )

        logout(request)
        return Response({"mensaje": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)
