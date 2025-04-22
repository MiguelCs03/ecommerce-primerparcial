# venta/serializers.py

from rest_framework import serializers
from .models import Estado, TipoVenta, Venta, Factura, Orden , OrdenItem
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
    tipo_venta = serializers.PrimaryKeyRelatedField(queryset=TipoVenta.objects.all())

    class Meta:
        model = Venta
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    venta = VentaSerializer()

    class Meta:
        model = Factura
        fields = '__all__'

class OrdenItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenItem
        fields = ['producto', 'cantidad']

class OrdenSerializer(serializers.ModelSerializer):
    items = OrdenItemSerializer(many=True, write_only=True)  # para crear
    orden_items = OrdenItemSerializer(many=True, read_only=True, source='items')  # para mostrar

    class Meta:
        model = Orden
        fields = ['id', 'usuario', 'fecha', 'estado', 'items', 'orden_items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        orden = Orden.objects.create(**validated_data)
        for item in items_data:
            OrdenItem.objects.create(orden=orden, **item)
        return orden