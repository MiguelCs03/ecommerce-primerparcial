# venta/serializers.py

from rest_framework import serializers
from .models import Estado, TipoVenta, Venta, Factura, Orden
from Usuarios.models import Usuario
from Productos.models import Producto

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class TipoVentaSerializer(serializers.ModelSerializer):
    estado = EstadoSerializer()

    class Meta:
        model = TipoVenta
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    tipo_venta = TipoVentaSerializer()

    class Meta:
        model = Venta
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    venta = VentaSerializer()

    class Meta:
        model = Factura
        fields = '__all__'

class OrdenSerializer(serializers.ModelSerializer):
    venta = VentaSerializer()
    usuario = serializers.StringRelatedField()
    producto = serializers.StringRelatedField()

    class Meta:
        model = Orden
        fields = '__all__'
