from rest_framework import serializers
from .models import Producto, Categoria, Proveedor, Inventario

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    inventario = InventarioSerializer(read_only=True)  # Ahora InventarioSerializer está definido

    class Meta:
        model = Producto
        fields = '__all__'

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