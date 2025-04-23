from rest_framework import serializers
from .models import Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'id',
            'nombre',
            'correo',
            'fecha_de_nacimiento',
            'genero',
            'estado',
            'direccion',
            'is_staff'
        ]
        read_only_fields = ['id', 'is_staff']