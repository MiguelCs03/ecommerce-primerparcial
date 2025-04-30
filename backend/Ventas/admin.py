from django.contrib import admin
from .models import Estado, TipoVenta, Venta, Factura, Orden, OrdenItem

admin.site.register(Estado)
admin.site.register(TipoVenta)
admin.site.register(Venta)
admin.site.register(Factura)
admin.site.register(Orden)
admin.site.register(OrdenItem)

# Register your models here.
