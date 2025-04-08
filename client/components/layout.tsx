import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { useCart } from '../hooks';

interface LayoutProps {
  children: ReactNode;
  cartItems: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartItems }) => {
  
  return (
    <div>
      <Header cartItems={cartItems} />
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
