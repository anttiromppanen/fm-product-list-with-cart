import { formatCurrency } from '@/helpers/helpers';
import React from 'react';
import { motion } from 'framer-motion';

function OrderTotal({ total }: { total: number }) {
  return (
    <div className="flex justify-between items-center my-4">
      <p className="text-sm">Order Total</p>
      <motion.p
        key={total}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-rose-950 font-bold text-xl"
      >
        {formatCurrency(total)}
      </motion.p>
    </div>
  );
}

export default OrderTotal;
