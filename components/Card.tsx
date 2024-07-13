'use client';

import Image from 'next/image';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AddToCartButton, AmountSelectorButton } from './AddToCartButton';
import { IItem } from '@/types/types';
import { useShoppingCart } from '@/store/useShoppingCart';

function Card({ item }: { item: IItem }) {
  const addItem = useShoppingCart((state) => state.addItem);
  const removeItem = useShoppingCart((state) => state.removeItem);
  const getItemAmount = useShoppingCart((state) => state.getItemAmount);
  const items = useShoppingCart((state) => state.items);
  const [amount, setAmount] = useState(getItemAmount(item));

  const handleAddToCart = useCallback(() => {
    addItem(item);
    setAmount(getItemAmount(item));
  }, [addItem, item, getItemAmount]);

  const handleRemoveFromCart = useCallback(() => {
    removeItem(item);
    setAmount(getItemAmount(item));
  }, [removeItem, item, getItemAmount]);

  useEffect(() => {
    setAmount(getItemAmount(item));
  }, [getItemAmount, item, items]);

  return (
    <article className="rounded-lg group">
      <div className="relative w-full h-48 md:h-60">
        <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-lg">
          <Image
            src={item.img}
            alt={item.name}
            sizes="300px"
            fill
            priority
            className="rounded-lg object-cover object-center lg:group-hover:scale-105 transition-transform"
          />
        </div>
        {amount > 0 ? (
          <AmountSelectorButton
            amount={amount}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ) : (
          <AddToCartButton handleAddToCart={handleAddToCart} />
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-rose-950 text-sm">{item.name}</h2>
        <p className="text-rose-950 font-semibold">{item.description}</p>
        <p className="text-userRed font-semibold">${item.price}</p>
      </div>
    </article>
  );
}

export default Card;
