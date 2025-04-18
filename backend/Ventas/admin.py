from django.contrib import admin
from .models import Estado, TipoVenta, Venta, Factura, Orden

admin.site.register(Estado)
admin.site.register(TipoVenta)
admin.site.register(Venta)
admin.site.register(Factura)
admin.site.register(Orden)

# Register your models here.
