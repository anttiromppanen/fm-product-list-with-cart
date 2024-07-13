'use client';

import { formatCurrency } from '@/helpers/helpers';
import { useOverlay } from '@/store/useOverlay';
import { useShoppingCart } from '@/store/useShoppingCart';
import { IItem } from '@/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';
import OrderConfirmationOverlay from './OrderConfirmationOverlay';
import OrderTotal from './OrderTotal';

function ShoppingCartItem({ item, amount }: { item: IItem; amount: number }) {
  const removeItem = useShoppingCart((state) => state.removeItem);
  const { description, price } = item;
  const totalPerItem = price * amount;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <article className="flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <h3 className="text-rose-950 font-medium text-sm">{description}</h3>
          <div className="flex gap-x-2 text-sm">
            <p className="font-bold text-userRed">{amount}x</p>
            <p className="text-rose-950/90">@ {formatCurrency(price)}</p>
            <p className="text-rose-950 font-semibold">
              {formatCurrency(totalPerItem)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => removeItem(item)}
          className="rounded-full border-rose-950/50 group border hover:border-rose-950/100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-rose-950/50 group-hover:text-rose-950/100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </article>
      <hr className="border-neutral-200 my-3" />
    </motion.div>
  );
}

function ShoppingCart() {
  const items = useShoppingCart((state) => state.items);
  const numOfItems = useShoppingCart((state) => state.numOfItems);
  const total = useShoppingCart((state) => state.totalAmount);

  const orderConfirmationIsOpen = useOverlay(
    (state) => state.orderConfirmationIsOpen
  );
  const openOrderConfirmation = useOverlay(
    (state) => state.openOrderConfirmation
  );

  // returns a tuple of [IItem, number of items in cart]
  const itemsArray = useMemo(() => Array.from(items.values()), [items]);

  return (
    <div className="p-6 rounded-lg bg-white h-fit mt-6 md:mt-0">
      {orderConfirmationIsOpen && <OrderConfirmationOverlay items={items} />}
      <h2 className="text-userRed font-bold text-xl mb-6">
        Your Cart ({numOfItems})
      </h2>
      {numOfItems === 0 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-y-4"
          >
            <Image
              src="/images/illustration-empty-cart.svg"
              alt="Empty Cart"
              width={100}
              height={100}
            />
            <p className="text-rose-950">Your added items will appear here</p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div>
          <AnimatePresence>
            {itemsArray.map(([item, amount]) => (
              <ShoppingCartItem key={item.id} item={item} amount={amount} />
            ))}
          </AnimatePresence>
          <OrderTotal total={total} />
          <div className="bg-rose-50 flex items-center gap-x-2 justify-center rounded-lg text-center py-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              fill="none"
              viewBox="0 0 21 20"
            >
              <path
                fill="#1EA575"
                d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
              />
              <path
                fill="#1EA575"
                d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
              />
            </svg>
            <p>
              This is a <span className="font-semibold">carbon-neutral</span>{' '}
              delivery
            </p>
          </div>
          <button
            type="button"
            onClick={openOrderConfirmation}
            className="btn-lg"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
