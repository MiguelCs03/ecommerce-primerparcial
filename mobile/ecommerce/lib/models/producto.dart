class Producto {
  final int id;
  final String nombre;
  final double precioVenta;
  final String imagenUrl;

  Producto({
    required this.id,
    required this.nombre,
    required this.precioVenta,
    required this.imagenUrl,
  });

  factory Producto.fromJson(Map<String, dynamic> json) {
    return Producto(
      id: json['id'],
      nombre: json['nombre'],
      precioVenta: double.parse(json['precio_venta'].toString()),
      imagenUrl: json['imagen_url'] ?? '', // si no hay imagen, queda vacío
    );
  }
}
