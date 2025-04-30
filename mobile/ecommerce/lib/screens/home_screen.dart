import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import '../models/producto.dart';
import '../services/product_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Producto> productos = [];
  bool isLoading = true;

  // Voice
  late stt.SpeechToText _speech;
  bool _isListening = false;

  @override
  void initState() {
    super.initState();
    _speech = stt.SpeechToText();
    cargarProductos();
  }

  Future<void> cargarProductos() async {
    setState(() => isLoading = true);
    try {
      final data = await ProductService.fetchProductos();
      setState(() {
        productos = data;
        isLoading = false;
      });
    } catch (e) {
      print('Error al cargar productos: $e');
      setState(() => isLoading = false);
    }
  }

  Future<void> buscarPorVoz(String texto) async {
    setState(() => isLoading = true);
    try {
      final data = await ProductService.buscarProductosPorVoz(texto);
      setState(() {
        productos = data;
        isLoading = false;
      });
    } catch (e) {
      print('Error búsqueda IA: $e');
      setState(() => isLoading = false);
    }
  }

  void iniciarReconocimientoVoz() async {
    bool available = await _speech.initialize();
    if (available) {
      setState(() => _isListening = true);
      _speech.listen(
        onResult: (result) {
          final texto = result.recognizedWords;
          if (texto.isNotEmpty && result.finalResult) {
            _speech.stop();
            setState(() => _isListening = false);
            buscarPorVoz(texto);
          }
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Productos'),
        backgroundColor: Colors.deepPurple,
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : productos.isEmpty
              ? const Center(child: Text('No se encontraron productos'))
              : ListView.builder(
                  itemCount: productos.length,
                  itemBuilder: (context, index) {
                    final p = productos[index];
                    return Card(
                      child: ListTile(
                        leading: Image.network(p.imagenUrl, width: 60, errorBuilder: (c, o, s) => const Icon(Icons.image_not_supported)),
                        title: Text(p.nombre),
                        subtitle: Text('\$${p.precioVenta.toStringAsFixed(2)}'),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: _isListening ? null : iniciarReconocimientoVoz,
        backgroundColor: Colors.teal,
        child: const Icon(Icons.mic),
      ),
    );
  }
}
