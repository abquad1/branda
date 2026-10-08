"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type CartItemType = {
  key: string;
  slug: string;
  name: string;
  option: string;
  unitUsd: number;
  qty: number;
};

type CartContextType = {
  cart: CartItemType[];
  addToCart: (item: Omit<CartItemType, "qty">, qty: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  subtotalUsd: number;
  isLoaded: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("branda-cart-v1");

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        // Keep only items that have the shape we expect
        const validItems = Array.isArray(parsedCart)
          ? parsedCart.filter(
              (item) =>
                typeof item.key === "string" &&
                typeof item.qty === "number" &&
                typeof item.unitUsd === "number",
            )
          : [];

        setCart(validItems);
      }
    } catch (error) {
      console.error("Failed to load stored cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("branda-cart-v1", JSON.stringify(cart));
  }, [cart, isLoaded]);

  const addToCart = (item: Omit<CartItemType, "qty">, qty: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.key === item.key,
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.key === item.key
            ? { ...cartItem, qty: cartItem.qty + qty }
            : cartItem,
        );
      } else {
        return [...prevCart, { ...item, qty }];
      }
    });
  };

  const removeFromCart = (key: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.key !== key));
  };

  const updateQuantity = (key: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.key === key
          ? { ...cartItem, qty: Math.max(1, qty) }
          : cartItem,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const count = cart.reduce((total, item) => total + item.qty, 0);
  const subtotalUsd = cart.reduce(
    (total, item) => total + item.qty * item.unitUsd,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        count,
        subtotalUsd,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
