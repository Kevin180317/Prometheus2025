import React, { useState } from "react";
import { motion } from "framer-motion";

function Portfolio() {
  const [rotation, setRotation] = useState(
    Array(6).fill({ rotateX: 0, rotateY: 0 })
  );

  const handleMouseMove = (e, index) => {
    const bounds = e.target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    const newRotation = [...rotation];
    newRotation[index] = {
      rotateX: center.y / 20,
      rotateY: -center.x / 20,
    };
    setRotation(newRotation);
  };

  const handleMouseLeave = (index) => {
    const newRotation = [...rotation];
    newRotation[index] = { rotateX: 0, rotateY: 0 };
    setRotation(newRotation);
  };

  const images = [
    {
      image:
        "http://unicord.themezinho.net/wp-content/uploads/2019/01/works02-3.jpg",
      title: "Project One",
      description: "Description for Project One",
    },
    {
      image:
        "http://unicord.themezinho.net/wp-content/uploads/2019/01/works03-3.jpg",
      title: "Project Two",
      description: "Description for Project Two",
    },
    {
      image:
        "http://unicord.themezinho.net/wp-content/uploads/2019/01/works01-3.jpg",
      title: "Project Three",
      description: "Description for Project Three",
    },
    {
      image:
        "http://unicord.themezinho.net/wp-content/uploads/2019/01/works04-3.jpg",
      title: "Project Four",
      description: "Description for Project Four",
    },
    {
      image:
        "http://unicord.themezinho.net/wp-content/uploads/2019/01/works05-3.jpg",
      title: "Project Five",
      description: "Description for Project Five",
    },
    {
      image:
        "http://unicord.themezinho.net/wp-content/uploads/2018/12/works06-1.jpg",
      title: "Project Six",
      description: "Description for Project Six",
    },
  ];

  return (
    <div className=" py-8 px-8 md:px-24 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {images.map((item, index) => (
          <motion.div
            key={index}
            className="relative max-w-sm rounded-lg overflow-hidden shadow-lg"
            style={{
              perspective: 2000,
            }}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transform: `rotateX(${rotation[index].rotateX}deg) rotateY(${rotation[index].rotateY}deg)`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {/* Texto encima de la imagen */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white pointer-events-none">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
