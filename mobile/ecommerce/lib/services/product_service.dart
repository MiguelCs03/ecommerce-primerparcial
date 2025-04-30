import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/producto.dart';

class ProductService {
  static const String _baseUrl = 'http://18.217.236.76:8000/';

  // Obtener todos los productos
  static Future<List<Producto>> fetchProductos() async {
    final url = Uri.parse('$_baseUrl/productos/listarCrear/');
    final response = await http.get(url);

    print('Código: ${response.statusCode}');
    print('Respuesta: ${response.body}');

    if (response.statusCode == 200) {
      List jsonData = jsonDecode(response.body);
      return jsonData.map((item) => Producto.fromJson(item)).toList();
    } else {
      throw Exception('Error al cargar productos');
    }
  }

  // Buscar productos por voz usando IA
  static Future<List<Producto>> buscarProductosPorVoz(String texto) async {
    final url = Uri.parse('$_baseUrl/productos/buscar-ia/');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'texto': texto}),
    );

    print('Código búsqueda IA: ${response.statusCode}');
    print('Respuesta IA: ${response.body}');

    if (response.statusCode == 200) {
      List jsonData = jsonDecode(response.body);
      return jsonData.map((item) => Producto.fromJson(item)).toList();
    } else {
      throw Exception('Error al buscar productos por voz');
    }
  }
}
