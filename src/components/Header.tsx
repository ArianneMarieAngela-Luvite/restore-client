import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import restore from "../assets/restore-logo.png";
import { Link, useNavigate } from "react-router-dom";
// import ShimmerButton from "./ui/shimmer-button";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleLoginButton = () => {
    navigate("/login");
  };

  const sections = ["hero", "about", "pricing", "contact-us", "team"];


  useEffect(() => {
    const handleScrollSpy = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleScrollSpy, {
      threshold: 0.5, // Trigger when 50% of the section is in view
    });

    sections.forEach((section) => {
      const target = document.getElementById(section);
      if (target) observer.observe(target);
    });

    return () => {
      sections.forEach((section) => {
        const target = document.getElementById(section);
        if (target) observer.unobserve(target);
      });
    };
  }, [sections]);

  // const scrollToSection = (sectionId: string) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };
  const scrollToSection = (sectionId: string, offset = -70) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = offset; // Add a positive value for spacing between sections
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
      window.scrollTo({
        top: y,
        behavior: "smooth", 
      });
    }
  };

  const isActive = (section: string) => activeSection === section;

  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-md border">
      <div className="flex justify-between w-full items-center py-4 px-10 my-3 md:pt-4">
        <div className="lg:mx-10 xl:mx-10 md:mx-10 cursor-pointer">
          <Link to="/" onClick={() => scrollToSection("hero")}>
            <img src={restore} className="h-11 w-11" alt="Restore Logo" />
          </Link>  
        </div>
        <div className="hidden md:block mr-10">
          <ul className="text-customTextColor flex gap-6">
            <li
              className={`inline-block py-1 px-3 font-semibold text-base transition-colors duration-300 cursor-pointer
                ${isActive("about") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}`}
              onClick={() => scrollToSection("about")}
            >
              About
            </li>
            <li
              className={`inline-block py-1 px-3 font-semibold transition-colors duration-300 cursor-pointer
                ${isActive("pricing") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}`}
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </li>
            <li
              className={`inline-block py-1 px-3 font-semibold transition-colors duration-300 cursor-pointer
                ${isActive("contact-us") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))]" : "text-customTextColor hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}`}
              onClick={() => scrollToSection("contact-us")}
            >
              Contact Us
            </li>
            <li className="inline-block px-2">
              <Button onClick={handleLoginButton} className="bg-primary h-9 w-16">
                Login
              </Button>
            </li>
          </ul>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-1 bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden">
          <ul className="flex border flex-col text-center gap-4 bg-white py-2 shadow-lg">
            <li onClick={() => scrollToSection("about")} className="cursor-pointer py-2 px-4 hover:bg-customGreen rounded-md">
              About
            </li>
            <li onClick={() => scrollToSection("pricing")} className="cursor-pointer py-2 px-4 hover:bg-customGreen rounded-md">
              Pricing
            </li>
            <li>
              <Button onClick={handleLoginButton} className="mx-auto mb-2 font-semibold">
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
