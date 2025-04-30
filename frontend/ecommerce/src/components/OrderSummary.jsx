import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useAuthStoreWithLoading } from "../stores/useAuthStore";
import OrderService from "../services/ventaService";

const OrderSummary = () => {
	const { currentUser, isLoading } = useAuthStoreWithLoading();

	const {
		total,
		subtotal,
		coupon,
		isCouponApplied,
		cart,
		calculateTotals,
		clearCart,
	
	} = useCartStore();

	useEffect(() => {
		calculateTotals();
	}, [calculateTotals]);

	const safeSubtotal = Number(subtotal) || 0;
	const safeTotal = Number(total) || 0;
	const savings = safeSubtotal - safeTotal;

	const formattedSubtotal = safeSubtotal.toFixed(2);
	const formattedTotal = safeTotal.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePurchase = async () => {
		try {
			console.log("currentUser", currentUser);
			console.log("cart", cart);
			// if (!currentUser) {
			// 	alert("Debes iniciar sesión para realizar una compra");
			// 	return;
			// }

			const ordenData = {
				usuario: currentUser.user_id,
				estado: "Pendiente",
				items: cart.map((item) => ({
					producto: item._id,
					cantidad: item.quantity,
				})),
			};

			const nuevaOrden = await OrderService.createOrder(ordenData);
			console.log("Orden creada:", nuevaOrden);

			const ventaData = {
				orden: nuevaOrden.id,
				total: safeTotal,
			};
			console.log("ventaData", ventaData);
			const nuevaVenta = await OrderService.createVenta(ventaData);
			console.log("Venta creada:", nuevaVenta);
       
			clearCart();
			alert("¡Compra realizada exitosamente!");
		} catch (error) {
			console.error("Error al procesar la compra:", error);
			alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
		}
	};

	return (
		<motion.div
			className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className="text-xl font-semibold text-emerald-400">Resumen de Compra</p>

			<div className="space-y-4">
				<div className="space-y-2">
					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-300">Precio original</dt>
						<dd className="text-base font-medium text-white">${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-gray-300">Ahorros</dt>
							<dd className="text-base font-medium text-emerald-400">-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-gray-300">Cupón ({coupon.code})</dt>
							<dd className="text-base font-medium text-emerald-400">-{coupon.discountPercentage}%</dd>
						</dl>
					)}

					<dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
						<dt className="text-base font-bold text-white">Total</dt>
						<dd className="text-base font-bold text-emerald-400">${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePurchase}
					disabled={cart.length === 0 || isLoading}
				>
					{isLoading ? "Cargando..." : "Finalizar Compra"}
				</motion.button>

				<div className="flex items-center justify-center gap-2">
					<span className="text-sm font-normal text-gray-400">o</span>
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
					>
						Continuar Comprando
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
