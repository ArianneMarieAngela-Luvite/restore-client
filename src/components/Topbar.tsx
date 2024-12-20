import restore from "../assets/restore-logo.png";
import { Separator } from "./ui/separator";
import LogoutController from "../controllers/LogoutController";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";

const Topbar = () => {
  const username = localStorage.getItem("username");
  const { handleLogout } = LogoutController();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="z-10 relative w-full font-rubik">
      <div className="flex justify-between w-screen items-center pb-4 pt-4 md:pb-7 md:pt-7 lg:py-8  shadow-md px-10 my-3 mt-0  border">
        <div className="flex items-center ">
            <div className="ml-3 mr-12 lg:mx-12 xl:mx-12">
              <Link to="/import">
                <img src={restore} className="h-11 w-11" alt="Restore Logo" />
              </Link>
              
            </div>
              <div className="hidden lg:block mr-10">
                <ul className="text-customTextColor flex gap-6">
                  <li
                    className={`inline-block py-1 px-3 text-base transition-colors duration-300
                      ${isActive("/import") ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold" : "text-customTextColor font-semibold hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"}
                    `}
                  >
                    <Link to="/import">Forecast</Link>
                  </li>
                  <li
                    className={`inline-block py-1 px-3 text-base transition-colors duration-300
                      ${
                        isActive("/sales-forecast")
                          ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold"
                          : "text-customTextColor font-semibold hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"
                      }`}
                  >
                    <Link to="/sales-forecast">Sales</Link>
                  </li>
                  <li
                    className={`inline-block py-1 px-3 text-base transition-colors duration-300
                    ${
                      isActive("/products-forecast")
                        ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold"
                        : "text-customTextColor font-semibold hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"
                    }`}
                  >
                    <Link to="/products-forecast">Products</Link>
                  </li>
                  <li
                    className={`inline-block py-1 px-3 text-base transition-colors duration-300
                      ${
                        isActive("/insights")
                          ? "text-primary shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold"
                          : "text-customTextColor font-semibold hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))]"
                      }`}
                  >
                    <Link to="/insights">Insights</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center hidden lg:block mr-1 lg:mr-10 xl:mr-10">
              <ul className="text-customTextColor flex gap-6">
                  <li className="tracking-wide font-lato inline-block py-1 px-3 font-base transition-colors duration-300">
                    Hello
                    <span className="text-primary font-bold"> {username}</span>!
                  </li>
                  <li>
                    <Separator orientation="vertical" className="bg-gray-300 mr-5" />
                  </li>
                  <li
                    
                  >
                    {/* <Link to="/" onClick={handleLogout}>
                      Log out
                    </Link> */}

                  <Button onClick={handleLogout} className="rounded-lg">
                      Log out
                  </Button>
                </li>
              </ul>
            </div>

            <button
              onClick={toggleMenu}
              className={`lg:hidden focus:outline-none mr-1 z-30`} 
            >
              <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-1 bg-gray-800"></span>
            </button>
          </div>

          {openMenu && (
          <div
            className="fixed inset-0 top-10 z-20"
            onClick={toggleMenu} 
          >
            <div
              className="absolute top-9 left-0 w-full bg-white shadow-lg z-20"
              onClick={(e) => e.stopPropagation()} 
            >
              <ul className="flex flex-col text-center gap-5 py-2 mb-2">
                <li>
                  <Link
                    to="/import"
                    className="cursor-pointer py-2 px-4 hover:bg-customGreen rounded-md"
                    onClick={toggleMenu}
                  >
                    Forecast
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-forecast"
                    className="cursor-pointer py-2 px-4 hover:bg-customGreen rounded-md"
                    onClick={() => setOpenMenu(false)}
                  >
                    Sales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products-forecast"
                    className="cursor-pointer py-2 px-4 hover:bg-customGreen rounded-md"
                    onClick={() => setOpenMenu(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    className="cursor-pointer py-2 px-4 hover:bg-customGreen rounded-md"
                    onClick={() => setOpenMenu(false)}
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="mx-auto mb-2 rounded-lg"
  >
                    Log out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
    </nav>
  );
};

export default Topbar;
