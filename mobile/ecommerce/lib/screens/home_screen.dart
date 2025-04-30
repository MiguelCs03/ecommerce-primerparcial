import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:http/http.dart' as http;
import '../models/producto.dart';
import '../widgets/product_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  final stt.SpeechToText _speech = stt.SpeechToText();
  bool _isListening = false;
  bool _loading = false;
  List<Producto> _productos = [];

  final String _apiUrl = 'http://10.0.2.2:8000/productos/buscar-ia/';

  Future<void> _buscarProductos(String texto) async {
    setState(() {
      _loading = true;
    });

    try {
      final response = await http.post(
        Uri.parse(_apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'texto': texto}),
      );

      if (response.statusCode == 200) {
        List data = jsonDecode(response.body);
        setState(() {
          _productos = data.map((e) => Producto.fromJson(e)).toList();
        });
      } else {
        throw Exception('Error al cargar productos');
      }
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error: $e')));
    }

    setState(() {
      _loading = false;
    });
  }

  Future<void> _escucharYBuscar() async {
    bool disponible = await _speech.initialize();

    if (disponible) {
      setState(() => _isListening = true);

      await _speech.listen(
        onResult: (result) {
          setState(() {
            _searchController.text = result.recognizedWords;
          });
        },
        listenFor: const Duration(seconds: 10),
        pauseFor: const Duration(seconds: 3),
        onSoundLevelChange: (level) {},
        partialResults: true,
        localeId: 'es_BO', // o 'es_ES', según prefieras
        cancelOnError: true, // aunque esté deprecated, aún no da error crítico
      );

      await Future.delayed(const Duration(seconds: 7));
      _speech.stop();
      setState(() => _isListening = false);
      _buscarProductos(_searchController.text);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('No se pudo iniciar el reconocimiento de voz'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Catálogo de Productos'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(60),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              controller: _searchController,
              onSubmitted: _buscarProductos,
              decoration: InputDecoration(
                hintText: 'Buscar producto...',
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: () => _buscarProductos(_searchController.text),
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                ),
              ),
            ),
          ),
        ),
      ),
      body:
          _loading
              ? const Center(child: CircularProgressIndicator())
              : _productos.isEmpty
              ? const Center(child: Text('No hay productos disponibles.'))
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
      floatingActionButton: FloatingActionButton(
        onPressed: _escucharYBuscar,
        child: Icon(_isListening ? Icons.mic : Icons.mic_none),
      ),
    );
  }
}
