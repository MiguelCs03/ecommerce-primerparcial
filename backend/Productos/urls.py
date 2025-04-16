from django.urls import path
from Productos.controllers.producto_controller import ProductoListaCrearVista, ProductoDetalleVista, ProductosPorCategoriaView
from Productos.controllers.categoria_controller import CategoriaListaCrearVista, CategoriaDetalleVista
from Productos.controllers.proveedor_controller import ProveedorListaCrearVista, ProveedorDetalleVista
from Productos.controllers.inventario_controller import InventarioListaCrearVista, InventarioDetalleVista
urlpatterns = [
    path('listarCrear/', ProductoListaCrearVista.as_view(), name='producto-listar-crear'),
    path('detalles/<int:pk>/', ProductoDetalleVista.as_view(), name='producto-detalle'),
    path('categorias/', CategoriaListaCrearVista.as_view(), name='categoria-listar-crear'),
    path('categorias/<int:pk>/', CategoriaDetalleVista.as_view(), name='categoria-detalle'),
    path('porCategoria/<str:valor>/', ProductosPorCategoriaView.as_view(), name='productos_por_categoria'),
    path('proveedores/', ProveedorListaCrearVista.as_view(), name='proveedor-listar-crear'),
    path('proveedores/<int:pk>/', ProveedorDetalleVista.as_view(), name='proveedor-detalle'),
    path('inventarios/', InventarioListaCrearVista.as_view(), name='inventario-listar-crear'),
    path('inventarios/<int:pk>/', InventarioDetalleVista.as_view(), name='inventario-detalle'),
]
