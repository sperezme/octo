import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useCart } from '.';

describe('useCart hook', () => {
  beforeEach(() => {
    localStorage.clear(); // reset before each test
  });

  it('should initialize with 0 if no localStorage', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.cartItems).toBe(0);
  });

  it('should initialize from localStorage', () => {
    localStorage.setItem('cartItems', '5');
    const { result } = renderHook(() => useCart());

    // `useEffect` runs after mount, so wait for it
    expect(result.current.cartItems).toBe(5);
  });

  it('should update cart correctly', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.updateCart(3);
    });

    expect(result.current.cartItems).toBe(3);
    expect(localStorage.getItem('cartItems')).toBe('3');
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.updateCart(10);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toBe(0);
    expect(localStorage.getItem('cartItems')).toBe('0');
  });
});
