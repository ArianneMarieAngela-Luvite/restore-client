// import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PulsatingButton from "@/components/ui/pulsating-button";
// import bg from "../assets/b3.png";
import HyperText from "@/components/ui/hyper-text";

const Landing = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login");
  };
  return (
    <div
      className="h-100vh  w-full bg-white"
      // style={{ backgroundImage: `url(${bg})` }}
    >
   <div
    id="hero"
    className="container mx-auto pt-36  pb-10 h-screen">
      <div className=" flex flex-col justify-center items-center gap-1 text-white md:py-0 font-rubik">
        
        <motion.h1 
          className="
          pt-12 text-left text-[56px] font-bold leading-relaxed mb-5  text-primary font-lato
          xl:text-7xl xl:leading-normal
          lg:text-[85px] 
          md:text-[75px] 
          sm:text-[65px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Forecasting Your <br className="hidden md:block"/> Way {" "}
            <span className="font-vujahday ">Forward</span> */}
            <HyperText 
            className="text-8xl font-bold leading-relaxed  text-primary font-lato "
            text="FORECASTING"
            duration={1000}
            />

            <span className="text-black">YOUR WAY FORWARD</span>
        </motion.h1>
        <div className="flex w-2/4 justify-start   ">
          <motion.p 
            className="text-left text-base text-black lg:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Plan ahead and make better decisions  with reliable smart forecasting.
             */}
             Is your business prepared for tomorrow's market demand?
        </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex w-2/4"
        >
            <PulsatingButton onClick={handleLoginButton} pulseColor="#38bd69" className="my-5 mr-5 rounded-lg bg-primary">Start Now</PulsatingButton>
            
        </motion.div>
      </div>  
      
    </div>
    </div>
  ); 
};
export default Landing;
