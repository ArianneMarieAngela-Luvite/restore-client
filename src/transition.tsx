import { motion } from "framer-motion";
import { FC, ComponentType } from "react";

const transition = (OgComponent: ComponentType) => {
  const WrappedComponent: FC = () => (
    <>
      <OgComponent />
      <motion.div
        className="slide-in fixed top-0 left-0 w-full h-100vh bg-customCardColor transform origin-bottom"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out fixed top-0 left-0 w-full h-100vh bg-customCardColor transform origin-top"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );

  return WrappedComponent;
};

export default transition;
