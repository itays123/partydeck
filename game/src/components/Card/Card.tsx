import { motion } from 'framer-motion';
import { Wrapper } from '../types';

export interface Specs {
  inactive?: boolean;
  small?: boolean;
}

export default function Card({
  children,
  inactive = false,
  small = false,
}: Wrapper & Specs) {
  return (
    <motion.div
      className="rounded px-3 py-2 w-32 h-48"
      initial={false}
      animate={{
        backgroundColor: inactive ? '#C7D2FEDE' : '#FFFFFF',
        scale: small ? 2 / 3 : 1,
      }}
    >
      {children}
    </motion.div>
  );
}
