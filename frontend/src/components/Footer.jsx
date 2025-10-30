// src/components/Footer.jsx
import React from "react";
import { Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-50 border-t border-blue-100 py-8">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">

        {/* SOCIAL ICONS */}
        <div className="flex space-x-6 mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 transition">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition">
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* INSPIRATIONAL QUOTE */}
        <p className="text-gray-600 text-sm italic mb-2">
          "Great stories begin with small ideas."
        </p>

        {/* COPYRIGHT */}
        <span className="text-gray-500 text-xs">
          © {year} — NAIA. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
