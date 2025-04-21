from django.urls import path
from Ventas.controllers.estado_controller import EstadoListCreateAPIView, EstadoRetrieveUpdateDestroyAPIView
from Ventas.controllers.tipoVenta_controller import TipoVentaListCreateAPIView, TipoVentaRetrieveUpdateDestroyAPIView
from Ventas.controllers.venta_controller import VentaListCreateAPIView, VentaRetrieveUpdateDestroyAPIView
from Ventas.controllers.factura_controller import FacturaListCreateAPIView, FacturaRetrieveUpdateDestroyAPIView
from Ventas.controllers.orden_controller import OrdenViewSet

urlpatterns = [
    path('estados/', EstadoListCreateAPIView.as_view(), name='estado-list-create'),
    path('estados/<int:pk>/', EstadoRetrieveUpdateDestroyAPIView.as_view(), name='estado-detail'),
    path('tipos/', TipoVentaListCreateAPIView.as_view(), name='tipo-venta-list-create'),
    path('tipos/<int:pk>/', TipoVentaRetrieveUpdateDestroyAPIView.as_view(), name='tipo-venta-detail'),
    path('ventas/', VentaListCreateAPIView.as_view(), name='venta-list-create'),
    path('ventas/<int:pk>/', VentaRetrieveUpdateDestroyAPIView.as_view(), name='venta-detail'),    
    path('facturas/', FacturaListCreateAPIView.as_view(), name='factura-list-create'),
    path('facturas/<int:pk>/', FacturaRetrieveUpdateDestroyAPIView.as_view(), name='factura-detail'),
    path('ordenes/', OrdenViewSet.as_view({'get': 'list', 'post': 'create'}), name='orden-list-create'),
  
]
