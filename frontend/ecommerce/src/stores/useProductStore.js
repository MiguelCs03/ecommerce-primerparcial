import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import ProductService from "../services/ProductService";
import VentaService from "../services/ventaService";
export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await ProductService.createProduct(productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response);
			set({ loading: false });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await ProductService.getAllProducts();
			console.log( response);
			set({ products: response, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await ProductService.getProductsByCategory(category);
			console.log(+ response);
			set({ products: response, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response || "Failed to fetch products");
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response|| "Failed to update product");
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},

	fetchproductosDestacados: async (id) => {
		set({ loading: true });
	
		const maxRetries = 5;
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	
		try {
			let attempts = 0;
			let response = [];
	
			while (attempts < maxRetries && response.length === 0) {
				console.log(`Intento #${attempts + 1} para obtener destacados del usuario ${id}`);
				const result = await VentaService.destacados(id);
				response = result;
	
				if (response.length === 0) {
					await delay(1000); // Espera 1 segundo antes del siguiente intento
				}
				attempts++;
			}
	
			if (response.length === 0) {
				toast.warning("No se encontraron productos destacados tras varios intentos.");
			}
	
			set({ destacados: response, loading: false });
		} catch (error) {
			console.error("Error al obtener productos destacados:", error);
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error?.response?.data?.message || "Failed to fetch products");
		}
	},
	
}));