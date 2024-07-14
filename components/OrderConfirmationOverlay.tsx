import { formatCurrency } from "@/helpers/helpers";
import { IItem } from "@/types/types";
import Image from "next/image";
import { useMemo } from "react";
import OrderTotal from "./OrderTotal";
import { useShoppingCart } from "@/store/useShoppingCart";
import { useOverlay } from "@/store/useOverlay";
import { AnimatePresence, motion } from "framer-motion";

function OrderItem({ item, amount }: { item: IItem; amount: number }) {
  const { imgThumb, price, description } = item;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <div className="relative w-12 h-12">
            <Image
              src={imgThumb}
              alt={item.name}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="text-sm">
            <h3 className="text-rose-950 font-semibold">{description}</h3>
            <div className="flex gap-x-3 mt-1">
              <p className="text-userRed font-semibold">{amount}x</p>
              <p className="text-rose-950/80">@ {formatCurrency(price)}</p>
            </div>
          </div>
        </div>
        <p className="text-rose-950 font-semibold">
          {formatCurrency(price * amount)}
        </p>
      </div>
      <hr className="border-neutral-200 my-4" />
    </>
  );
}

function OrderConfirmationOverlay({
  items,
}: {
  items: Map<string, [IItem, number]>;
}) {
  const closeOrderConfirmation = useOverlay(
    (state) => state.closeOrderConfirmation
  );
  const orderConfirmationIsOpen = useOverlay(
    (state) => state.orderConfirmationIsOpen
  );

  const total = useShoppingCart((state) => state.totalAmount);
  const resetItems = useShoppingCart((state) => state.resetItems);
  const itemsArray = useMemo(() => Array.from(items.values()), [items]);

  const handleCloseOrderConfirmation = () => {
    resetItems();
    closeOrderConfirmation();
  };

  return (
    <div
      className="
      fixed left-0 z-50 top-0 w-full h-dvh md:h-screen flex items-center justify-center bg-black/40
      "
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
        className="
        bg-white rounded-lg w-[calc(100%-16px)] h-[calc(100%-16px)] overflow-y-auto max-h-[700px] 
          md:h-auto md:w-[500px] px-6 py-8
          "
      >
        <Image
          src="/images/icon-order-confirmed.svg"
          alt="Order Confirmed"
          width={40}
          height={40}
        />
        <h4 className="mt-5 text-4xl font-bold text-neutral-800">
          Order Confirmed
        </h4>
        <p className="mt-2 text-sm text-neutral-800">
          We hope you enjoy your food!
        </p>
        <div className="bg-rose-50 rounded-lg p-4 pb-0.5 mt-8">
          {itemsArray.map(([item, amount]) => (
            <OrderItem key={item.id} item={item} amount={amount} />
          ))}
          <OrderTotal total={total} />
        </div>
        <button
          type="button"
          onClick={handleCloseOrderConfirmation}
          className="btn-lg"
        >
          Start New Order
        </button>
      </motion.div>
    </div>
  );
}

export default OrderConfirmationOverlay;
