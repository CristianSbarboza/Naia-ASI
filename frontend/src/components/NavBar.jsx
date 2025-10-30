import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X, BookAIcon } from "lucide-react";
import { useState } from "react";

import logo from '../assets/logos/NAIA_logo_curto.png';

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/create-history", label: "Create Story" },
    { to: "/stories-page", label: "My Stories", icon: <BookAIcon size={16} /> },
    { to: "/stories-page", label: "Translate Story", icon: <Globe size={16} /> }, // mesma rota
  ];

  const linkClasses = (to) =>
    `flex items-center gap-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-700 transition font-medium ${
      location.pathname === to ? "text-blue-700" : ""
    }`; // apenas cor do texto, sem bg

  return (
    <nav className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50 shadow-sm">
      <div className=" flex justify-between items-center h-16 px-6">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-800 transition"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logo}
            alt="NAIA Logo"
            className="w-12 h-12"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className={linkClasses(link.to)}>
              {link.icon && <span className="text-blue-500">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md flex flex-col px-4 py-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={linkClasses(link.to)}
            >
              {link.icon && <span className="text-blue-500">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
