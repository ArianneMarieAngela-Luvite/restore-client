// import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PulsatingButton from "@/components/ui/pulsating-button";
// import bg from "../assets/b18.png";
import HyperText from "@/components/ui/hyper-text";

const Landing = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login");
  };
  return (
    <div
    id="hero"
      className="h-screen w-full bg-contain md:bg-cover bg-no-repeat bg-center bg-[url('/src/assets/m2.png')] md:bg-[url('/src/assets/m1.png')] xl:bg-[url('/src/assets/b18.png')]"
      // style={{ backgroundImage: `url(${bg})` }}
    >
    <div  className="container  mx-auto pt-20 h-screen ">
          <div className="flex items-center justify-center">
          <motion.div  initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="h-full px-20  bg-cover flex flex-col items-start gap-1 text-white md:py-0 font-rubik ">
          
            <motion.h1 
              className=" 
              text-left text-5xl font-bold leading-relaxed pb-3  text-primary font-rubik mt-16
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
              text-left text-5xl text-primary leading-relaxed font-lato "
              text="FORECASTING"
              duration={1000}
              />

              <span className="
              text-left text-5xl font-bold leading-relaxed text-black
              lg:text-7xl lg:leading-relaxed
              sm:text-6xl sm:leading-relaxed">
                YOUR WAY FORWARD</span>
            </motion.h1>
            <motion.p  
              className="text-left  text-base justify-start text-black lg:text-lg pl-1 font-rubik"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
             >  
              {/* Plan ahead and make better decisions  with reliable smart forecasting.
              */}
               Is your business prepared for tomorrow's market demand?
            </motion.p>
            <PulsatingButton onClick={handleLoginButton} pulseColor="#38bd69" className="my-5 mr-5 ml-1 font-rubik rounded-lg bg-primary text-sm">Start Now</PulsatingButton>

        </motion.div>  
          </div>
        
      </div>
    </div>
  ); 
};
export default Landing;


          //     <HyperText 
          //     className="text-7xl font-bold leading-relaxed  text-primary font-lato "
          //     text="FORECASTING"
          //     duration={1000}
          //     />

          //     <span className="text-black">YOUR WAY FORWARD</span>
          // </motion.h1>
          // <div className="flex w-3/4 justify-start ">
          //   <motion.p  
          //     className="text-left border text-base text-black lg:text-lg pl-1 font-rubik"
          //     initial={{ opacity: 0 }}
          //     animate={{ opacity: 1 }}
          //     transition={{ delay: 0.5, duration: 0.8 }}
          //    >  
          //      Is your business prepared for tomorrow's market demand?
          // </motion.p>
          // </div>