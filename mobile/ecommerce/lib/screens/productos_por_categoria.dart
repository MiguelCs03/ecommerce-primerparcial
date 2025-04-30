import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../models/producto.dart';
import '../widgets/product_card.dart';

class ProductosPorCategoriaScreen extends StatefulWidget {
  final String categoria;

  const ProductosPorCategoriaScreen({super.key, required this.categoria});

  @override
  State<ProductosPorCategoriaScreen> createState() =>
      _ProductosPorCategoriaScreenState();
}

class _ProductosPorCategoriaScreenState extends State<ProductosPorCategoriaScreen> {
  bool _loading = true;
  List<Producto> _productos = [];

  @override
  void initState() {
    super.initState();
    _fetchProductosPorCategoria();
  }

  Future<void> _fetchProductosPorCategoria() async {
    final url = Uri.parse(
        'http://18.217.236.76:8000/productos/porCategoria/${widget.categoria}/');

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        List data = jsonDecode(response.body);
        setState(() {
          _productos = data.map((e) => Producto.fromJson(e)).toList();
          _loading = false;
        });
      } else {
        throw Exception('Error al cargar productos');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Categoría: ${widget.categoria}'),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _productos.isEmpty
              ? const Center(child: Text('No hay productos en esta categoría.'))
              : GridView.builder(
                  padding: const EdgeInsets.all(10),
                  itemCount: _productos.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    childAspectRatio: 0.75,
                  ),
                  itemBuilder: (context, index) {
                    return ProductCard(producto: _productos[index]);
                  },
                ),
    );
  }
}