import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PulsatingButton from "@/components/ui/pulsating-button";
import bg from "../assets/b18.png";
import HyperText from "@/components/ui/hyper-text";

const TestLanding = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login");
  };
  return (
    <div
    id="hero"
      className="bg-cover "
      style={{ backgroundImage: `url(${bg})` }}
    >
    <div  className="container  mx-auto pt-20 md:pt-0  ">
        <div className="flex items-center justify-center pb-10 md:h-screen">
          <motion.div  initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="h-full px-5 md:px-20  bg-cover flex flex-col items-center justify-center md:items-start gap-1 text-white md:py-0 font-rubik ">
          
            <motion.h1 
              className=" 
              text-center md:text-left text-5xl font-bold leading-relaxed pb-3  text-primary font-rubik mt-16
              xl:text-7xl xl:leading-normal
              lg:text-7xl
              md:text-6xl md:mt-32
              sm:text-6xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Forecasting Your <br className="hidden md:block"/> Way {" "}
              <span className="font-vujahday ">Forward</span> */}
              <HyperText 
              className="
              lg:text-7xl lg:leading-relaxed
              sm:text-6xl sm:leading-relaxed
              text-center md:text-left text-5xl text-primary leading-relaxed font-lato "
              text="FORECASTING"
              duration={80}
              />

              <span className="
              text-center   md:text-left text-5xl font-bold leading-relaxed text-black
              lg:text-7xl lg:leading-relaxed
              sm:text-6xl sm:leading-relaxed">
                YOUR WAY FORWARD</span>
            </motion.h1>
            <motion.p  
              className="text-center md:text-left   text-base justify-start text-black lg:text-lg pl-1 md:pl-4 font-rubik"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
             >  
              {/* Plan ahead and make better decisions  with reliable smart forecasting.
              */}
               Is your business prepared for tomorrow's market demand?
            </motion.p>
            <PulsatingButton onClick={handleLoginButton} pulseColor="#38bd69" className="my-5 mr-5 ml-1 md:ml-4 font-rubik rounded-lg bg-primary text-sm">Start Now</PulsatingButton>

        </motion.div>  
          </div>
        
      </div>
    </div>
  ); 
};
export default TestLanding;

