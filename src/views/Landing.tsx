import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login");
  };
  return (
   <div
    id="hero"
    className="relative font-lato">
      <div className="h-fit  flex flex-col mt-24 mb-28 items-center md:py-0 text-customTextColor">

        <motion.h1 
          className="
          mt-20 text-center text-[56px] font-normal leading-relaxed font-lato
          xl:text-[85px] xl:leading-normal
          lg:text-[85px] 
          md:text-[75px] 
          sm:text-[65px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            Forecasting Your <br className="hidden md:block"/> Way {" "}
            <span className="font-vujahday ">Forward</span>
        </motion.h1>
        <motion.p 
          className="text-center leading-10 font-lato"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          "Make Informed Decisions with <br/> Intelligent Predictions."
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
            <Button onClick={handleLoginButton} className="my-5 mr-5 rounded-lg" >Start Now</Button>
            <Link to="/home" className="font-lato">Learn more</Link>
        </motion.div>
      </div>  
      
    </div>
  );
};
export default Landing;
