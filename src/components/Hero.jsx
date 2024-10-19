import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const gallery = [
    "https://picsum.photos/1920/1080?random=1",
    "https://picsum.photos/1920/1080?random=2",
    "https://picsum.photos/1920/1080?random=3",
  ];
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % gallery.length);
    }, 3000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [gallery.length]);

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleClick = (newIndex) => {
    setIndex(newIndex);
    resetInterval();
  };

  const getOrderedItems = () => {
    const orderedItems = [];
    const halfLength = Math.floor(gallery.length / 2);
    for (let i = -halfLength; i <= halfLength; i++) {
      orderedItems.push((index + i + gallery.length) % gallery.length);
    }
    return orderedItems;
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center text-white relative overflow-hidden">
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 z-10">
        {getOrderedItems().map((i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`text-4xl font-bold ${
              i === index ? "text-yellow-500" : "text-white"
            }`}
          >
            Item {i + 1}
          </button>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full"
        >
          <img
            src={gallery[index]}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-10 left-16 p-4 text-5xl font-black bg-black bg-opacity-50 text-white z-10">
        {index + 1}/{gallery.length}
      </div>
    </div>
  );
};

export default Hero;
