import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';

const buttonStyles =
  'w-1/2 md:w-3/5 md:text-xs lg:text-sm items-center py-3 px-2 text-sm flex font-medium absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full';

export function AmountSelectorButton({
  amount,
  handleAddToCart,
  handleRemoveFromCart,
}: {
  amount: number;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
}) {
  return (
    <div
      className={`
      ${buttonStyles} justify-between bg-userRed text-white px-2
    `}
    >
      <button
        type="button"
        onClick={handleRemoveFromCart}
        className="rounded-full flex items-center justify-center border size-5 border-white hover:bg-white hover:text-userRed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="2"
          fill="none"
          viewBox="0 0 10 2"
          className="svg-icon"
        >
          <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
        </svg>
      </button>
      {amount}
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded-full flex items-center justify-center border size-5 border-white hover:bg-white hover:text-userRed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
          className="svg-icon"
        >
          <path
            fill="currentColor"
            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
          />
        </svg>
      </button>
    </div>
  );
}

export function AddToCartButton({
  handleAddToCart,
}: {
  handleAddToCart: () => void;
}) {
  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`
      ${buttonStyles}
      gap-x-2 hover:border-userRed hover:text-userRed justify-center
    bg-white border border-rose-950
      `}
    >
      <Image
        src="/images/icon-add-to-cart.svg"
        alt="Add to Cart"
        width={21}
        height={20}
      />
      Add to Cart
    </button>
  );
}
