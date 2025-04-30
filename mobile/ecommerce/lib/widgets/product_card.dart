import 'package:flutter/material.dart';
import '../models/producto.dart';

class ProductCard extends StatelessWidget {
  final Producto producto;

  const ProductCard({Key? key, required this.producto}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: producto.imagenUrl.isNotEmpty
                ? Image.network(
                    producto.imagenUrl,
                    fit: BoxFit.cover,
                    width: double.infinity,
                  )
                : const Icon(Icons.image_not_supported),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              producto.nombre,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text('\$${producto.precioVenta.toString()}'),
          ),
        ],
      ),
    );
  }
}
