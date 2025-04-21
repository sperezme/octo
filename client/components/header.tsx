import Image from 'next/image';
import React from 'react';
import Basket from "../public/basket.svg";
import ClientOnly from './clientOnly';

const Header = ({ cartItems, clearCart }: { cartItems: number, clearCart: () => void; }) => {
  return (
    <header className="header slide-down" role="banner" aria-labelledby="header-logo">
      <div className="logo" id="header-logo">
        <Image
          src="https://static.octopuscdn.com/logos/logo.svg"
          alt="Octopus Energy Logo"
          height={22}
          width={150}
          layout="intrinsic"
          priority
        />
      </div>

      <div className="cart-icon" aria-live="polite" onClick={clearCart}>
        <ClientOnly>
          <span title="Basket items" aria-label={`You have ${cartItems} item(s) in your basket`}>
            {cartItems}
          </span>
        </ClientOnly>
        <Image
          src={Basket}
          width={20}
          height={20}
          alt="Basket Icon"
        />
      </div>
    </header>
  );
};

export default Header;
