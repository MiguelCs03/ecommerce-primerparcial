from django.contrib import admin
from .models import Categoria, Proveedor, Producto, Inventario


# Register your models here.
admin.site.register(Categoria)
admin.site.register(Proveedor)
admin.site.register(Producto)
admin.site.register(Inventario)