# Productos/serializers.py

from rest_framework import serializers
from .models import Producto, Categoria, Proveedor, Inventario

from rest_framework import serializers
from Productos.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    stock = serializers.IntegerField(source='inventario.stock', read_only=True)

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio_compra', 'precio_venta', 'descripcion', 'imagen',
                  'categoria', 'proveedor', 'stock']


    def validate_precio_venta(self, valor):
        if valor <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a cero.")
        return valor
    
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__' 

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'      