import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      coupon: null,
      total: 0,
      subtotal: 0,
      isCouponApplied: false,
      length: 0,
      getCartItems: () => {
        get().calculateTotals(); // ya está en memoria
      },

      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item._id === product._id);
		
        const newCart = existingItem
          ? cart.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...cart, { ...product, quantity: 1 ,}];

        set({ cart: newCart, length: get().length + 1 });
        get().calculateTotals();
		console.log(get().length);
        toast.success("Producto agregado al carrito");
      },

      removeFromCart: (productId) => {
        const newCart = get().cart.filter((item) => item._id !== productId);
        set({ cart: newCart });
        get().calculateTotals();
        toast.success("Producto eliminado del carrito");
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const newCart = get().cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );

        set({ cart: newCart });
        get().calculateTotals();
      },

      clearCart: () => {
        set({ cart: [], coupon: null, total: 0, subtotal: 0, isCouponApplied: false });
        toast.success("Carrito vaciado");
      },

      applyCoupon: (code) => {
        // Cupón simulado en frontend
        const mockCoupons = {
          "DESCUENTO10": { code: "DESCUENTO10", discountPercentage: 10 },
          "OFERTA20": { code: "OFERTA20", discountPercentage: 20 },
        };

        const coupon = mockCoupons[code.toUpperCase()];
        if (coupon) {
          set({ coupon, isCouponApplied: true });
          get().calculateTotals();
          toast.success("Cupón aplicado correctamente");
        } else {
          toast.error("Cupón inválido");
        }
      },

      removeCoupon: () => {
        set({ coupon: null, isCouponApplied: false });
        get().calculateTotals();
        toast.success("Cupón eliminado");
      },

      calculateTotals: () => {
        const { cart, coupon } = get();
        console.log("carrito");
        console.log(cart);
        const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.precio) * item.quantity, 0);
        let total = subtotal;

        if (coupon) {
          const discount = subtotal * (coupon.discountPercentage / 100);
          total = subtotal - discount;
        }

        set({ subtotal, total });
      },
    }),
    {
      name: "cart-storage", // clave en localStorage
    }
  )
);