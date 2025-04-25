from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from Ventas.models import Venta
from Productos.models import Producto
from Productos.serializers import ProductoSerializer

class RecomendacionProductosView(APIView):
    def get(self, request, formato=None):
        # Obtener los IDs de productos más vendidos
        productos_ids = (
            Venta.objects
            .values('orden__items__producto')
            .annotate(total=Count('id'))
            .order_by('-total')
            .values_list('orden__items__producto', flat=True)
            .distinct()[:5]  # top 5 productos más vendidos
        )

        # Buscar productos reales usando los IDs
        productos = Producto.objects.filter(id__in=productos_ids)

        # Serializar los productos
        serializer = ProductoSerializer(productos, many=True)
        return Response({"recomendaciones": serializer.data})
