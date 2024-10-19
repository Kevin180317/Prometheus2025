import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import navItems from "@components/NavList";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`p-4 top-0 w-screen fixed z-50 transition-colors duration-300  ${scrolled ? "bg-blue-500 shadow-2xl shadow-black" : "bg-transparent"}`}
      >
        <div className="px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="" alt="Logo" title="Logo" />
            <a
              href="mailto:contact@prometheustij.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline"
            >
              contact@prometheustij.com
            </a>
          </div>
          <div className="">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-900 text-3xl"
            >
              ☰
            </button>
          </div>
        </div>
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed inset-0 bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center z-50"
            >
              <button
                onClick={toggleMenu}
                className="absolute top-2 right-6 text-white text-6xl"
              >
                &times;
              </button>
              <div className="text-white text-2xl space-y-4">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="block">
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Navbar;
