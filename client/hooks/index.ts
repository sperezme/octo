import { useRef, useState, useEffect, useReducer } from 'react';

export function useRenderCount(componentName: string) {
  const renders = useRef(1);
  console.log(`${componentName} renders count:
  ${renders.current++}`);
}

export const useLocalStorage = (key, initialValue) => {
  const getStoredValue = () => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error('Error reading from localStorage', error);
        return initialValue;
      }
    }
    return initialValue;
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(getStoredValue());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  };

  return [storedValue, setValue];
};

export const useCart = () => {

  const [cartItems, setCartItems] = useLocalStorage('cartItems', 0);

  // Check for cart state in localStorage on initial render (if needed)
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(parseInt(storedCart, 10)); // Parse the stored value into a number
    }
  }, []);


  const updateCart = (quantity) => {
    const updatedCart = cartItems + quantity;
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', updatedCart.toString());
  };

  const clearCart = () => {
    setCartItems(0);
    localStorage.setItem('cartItems', '0');
  };

  return {
    cartItems,
    updateCart,
    clearCart,
  };
};