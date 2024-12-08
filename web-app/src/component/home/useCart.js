import { useState, useEffect, useContext } from 'react';
import { CartContext } from "../../context/CartContext";

export default function useCart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);

    if(cart) {
      // Save the cart items to local storage whenever they change
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }

  }, [cart]);

  const handleAddToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cart];
      updatedCartItems[existingItemIndex].quantity += product.quantity;
      setCart(updatedCartItems);
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = cart?.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    setCart(updatedCartItems);
  };

  const deleteItemsFromCart = () => {
    setCart([])
  }

  return {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    deleteItemsFromCart,
    setCart,
    total
  };
}