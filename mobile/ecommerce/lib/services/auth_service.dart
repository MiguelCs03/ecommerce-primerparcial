// Archivo nuevo: lib/services/auth_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String _baseUrl = 'http://18.217.236.76:8000/';

  static Future<String?> login(String correo, String contrasena) async {
    final url = Uri.parse('$_baseUrl/usuarios/login/');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'correo': correo,
        'contraseña': contrasena,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('access', data['access']);
      await prefs.setString('refresh', data['refresh']);
      return null; // null indica éxito
    } else {
      try {
        final error = jsonDecode(response.body);
        return error['mensaje'] ?? 'Error de login';
      } catch (_) {
        return 'Error desconocido';
      }
    }
  }
}
