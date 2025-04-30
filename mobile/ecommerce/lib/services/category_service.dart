import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/categoria.dart';
class CategoryService {
  static const String _baseUrl = 'http://10.0.2.2:8000'; // Ajusta si usas otro IP

  static Future<List<Categoria>> fetchCategorias() async {
    final url = Uri.parse('$_baseUrl/productos/categorias/');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      List jsonData = jsonDecode(response.body);
      return jsonData.map((item) => Categoria.fromJson(item)).toList();
    } else {
      throw Exception('Error al cargar categorías');
    }
  }
}
