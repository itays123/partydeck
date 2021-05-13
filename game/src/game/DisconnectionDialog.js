import { motion } from 'framer-motion';

const DisconnectionDialog = () => {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 left-0 right-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
      ></motion.div>
      <motion.div
        className="absolute top-12 w-80 max-w-2/3 mx-auto left-0 right-0 rounded-2xl h-60 bg-white shadow-lg p-8 z-40 flex flex-col items-center"
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <h1 className="font-bold text-gray-800 text-6xl text-center mt-2">
          OOPS!
        </h1>
        <div className="text-md text-center mt-4">
          Seems like you got disconnected...
        </div>
        <a className="text-center mt-4 underline" href="/">
          Back to homepage
        </a>
      </motion.div>
    </>
  );
};

export default DisconnectionDialog;
