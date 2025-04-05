import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 mt-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Footer Text */}
        <p className="text-center text-gray-200">
          &copy; {new Date().getFullYear()} Event Management System. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-blue-500 transition text-xl">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition text-xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-300 hover:text-pink-500 transition text-xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-600 transition text-xl">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
