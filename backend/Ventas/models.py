from django.db import models
from Usuarios.models import Usuario
from Productos.models import Producto
# Create your models here.
class Estado(models.Model):
    descripcion = models.CharField(max_length=50)

    def __str__(self):
        return self.descripcion


class Orden(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=50, default='Pendiente')

    def __str__(self):
        return f"Orden #{self.id} - Usuario {self.usuario.nombre}"

class OrdenItem(models.Model):
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.producto.nombre} x{self.cantidad}"

class TipoVenta(models.Model):
    descripcion = models.CharField(max_length=50)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion


class Venta(models.Model):
    orden = models.OneToOneField(Orden, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_venta = models.ForeignKey(TipoVenta, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Venta #{self.id} - Total: {self.total}"


class Factura(models.Model):
    venta = models.OneToOneField(Venta, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    nit = models.CharField(max_length=20)
    precio_unidad = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)
    codigo_autorizacion = models.CharField(max_length=100)
    estado = models.CharField(max_length=20)

    def __str__(self):
        return f"Factura #{self.id} - Venta #{self.venta.id}"



