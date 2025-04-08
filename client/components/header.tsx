import Image from 'next/image';
import React from 'react';
import Basket from "../public/basket.svg";
// import { useRenderCount } from '../hooks';

const Header = ({ cartItems }: { cartItems: number }) => {
  // useRenderCount("==> header");
  return (
    <header className="header slide-down" role="banner" aria-labelledby="header-logo">
      <div className="logo" id="header-logo">
        <Image
          src="https://static.octopuscdn.com/logos/logo.svg"
          alt="Octopus Energy Logo"
          height={22}
          width={150}
          layout="intrinsic"
        />
      </div>

      <div className="cart-icon" aria-live="polite">
        <span title="Basket items" aria-label={`You have ${cartItems} item(s) in your basket`}>
          {cartItems}
        </span>
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
