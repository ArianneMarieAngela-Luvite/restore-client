import { useState } from "react";
import { Button } from "@/components/ui/button";
import restore from "../assets/logo_restore.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginButton = () => {
    navigate("/login");
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHome = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });

  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-md">
      <div className="container flex justify-between w-full items-center py-4 px-10 my-3 md:pt-4">
        <div className="mx-12 cursor-pointer" onClick={scrollToHome}>
          <img src={restore} alt="Restore Logo" />
        </div>
        <div className="hidden md:block mr-10">
          <ul className="text-customTextColor flex gap-6">
            <li>
              <a className="cursor-pointer inline-block py-1 px-3 hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold">
                About
              </a>
            </li>
            <li>
              <a onClick={scrollToPricing} className="cursor-pointer inline-block py-1 px-3 hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold">
                Pricing
              </a>
            </li>
            <li className="inline-block px-2">
              <Button onClick={handleLoginButton} className="h-8 w-22 rounded-lg">
                Login
              </Button>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {/* Hamburger */}
          <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-1 bg-gray-800"></span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col text-center bg-white py-2 shadow-lg">
            <li>
              <a className="cursor-pointer py-2 px-4 hover:bg-gray-100" onClick={scrollToHome}>
                About
              </a>
            </li>
            <li>
              <a className="cursor-pointer py-2 px-4 hover:bg-gray-100" onClick={scrollToPricing}>
                Pricing
              </a>
            </li>
            <li>
              <Button onClick={handleLoginButton} className="mx-auto my-2">
                Login
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;