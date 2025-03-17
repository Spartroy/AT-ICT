import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import Logo2 from "../assets/Logo2.png";
import Logo3 from "../assets/Logo3.png";

import { List } from "lucide-react";

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // 
  return (
    <nav className="fixed w-full left-0 right-0 bg-gradient-to-r from-[#0F0F0F] via-[#4A0D0D] to-[#C70039] h-24 py-2 px-4 sm:px-6 lg:px-10 z-10 font-pop rounded-b-xl">
      <div className="flex justify-between items-center h-full">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-[24pt]" onClick={toggleNav}>
          ☰
        </button>

        {/* Left Navigation Tabs (Desktop) */}
        <div className="hidden md:flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
          <a href="/About" className="text-white hover:text-gray-300 font-bold text-sm sm:text-base md:text-lg">About</a>
          <a href="#" className="text-white hover:text-gray-300 font-bold text-sm sm:text-base md:text-lg">Material Samples</a>

          <select name="cars" id="cars">
            <option value="">Material Samples</option>
            <option value="">Contact us</option>
            <option value="">Fees</option>
            <option value="">Brief Overview</option>
          </select>

        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="/">
            {/* <img src={Logo2} alt="Logo" className="w-32 sm:w-32 md:w-40 h-auto" /> */}

            <img src={Logo} alt="Logo" className="w-32 sm:w-32 md:w-40 h-auto" />

          </a>
        </div>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-gray-200 transition">
            Register
          </button>
          <a href="/Signin">
            <button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-xl font-bold hover:bg-white hover:text-black">
              Login
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#4A0D0D] z-40 flex flex-col items-center justify-center space-y-6 pt-20 md:hidden"
          >
            <button className="absolute top-4 right-4 text-white text-[24pt]" onClick={toggleNav}>
              ✕
            </button>

            <a href="#" onClick={toggleNav} className="text-white text-lg sm:text-xl font-bold">Home</a>
            <a href="/About" className="text-white text-lg sm:text-xl font-bold">About</a>
            <a href="#" onClick={toggleNav} className="text-white text-lg sm:text-xl font-bold">Sample Materials</a>
            <a href="#" onClick={toggleNav} className="text-white text-lg sm:text-xl font-bold">Contact Us</a>

            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
              Register
            </button>
            <a href="/Signin">
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-black">
                Login
              </button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
