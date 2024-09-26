import restore from "../assets/logo_restore.png";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import LogoutController from "../controllers/LogoutController";

const Topbar = () => {
  const username = localStorage.getItem("username");
  const { handleLogout } = LogoutController();
   return (
    <div className="border-b-2 container inline-flex justify-between w-full items-center py-4 px-10 my-3 md:pt-4">
      <div className="mx-12" >
        <Link to="/home">
          <img src={restore}  />
        </Link>
      </div>
      <div className="hidden md:block mr-10 ">
        <ul className="text-customTextColor flex gap-6">
          <li className="inline-block px-2 font-lato">
            Hello, {username}!
          </li>
          <li>
            <Separator orientation="vertical"/>
          </li>
          <li className="hover:border-b-2">
            <button 
             onClick={ handleLogout }
            className="bg-transparent border-none text-customTextColor font-lato p-0">
              Log out
            </button>
          </li>
        </ul>
        
      </div>
      
    </div>
  )
}

export default Topbar;