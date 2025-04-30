import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		console.log("Producto agregado al carrito");

		const productForCart = {
			_id: product.id,
			nombre: product.nombre,
			precio: product.precio_venta,
			image: product.image,
		};

		console.log("Producto agregado al carrito", productForCart);
		addToCart(productForCart);
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
				<img
					className='object-cover w-full'
					src={product.image || "/imagenreserva.jpg"}
					alt='product image'
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = "/imagenreserva.jpg";
					}}
				/>
				<div className='absolute inset-0 bg-black bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-gray-950'>{product.nombre}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-emerald-400'>${product.precio_venta}</span>
					</p>
				</div>
				<button
					className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;

