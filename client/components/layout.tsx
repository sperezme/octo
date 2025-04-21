import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { useCart } from '../hooks';

interface LayoutProps {
  children: ReactNode;
  cartItems: number;
  clearCart: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, cartItems, clearCart }) => {
  
  return (
    <div>
      <Header cartItems={cartItems}  clearCart={clearCart}/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
