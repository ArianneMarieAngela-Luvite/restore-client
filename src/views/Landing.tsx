import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
   <div
    id="hero"
    className="container border-b-2 relative font-lato">
      <div className="h-fit  flex flex-col mt-24 mb-28 items-center md:py-0 text-customTextColor">

        <motion.h1 
          className="mt-20 text-center text-8xl font-normal leading-relaxed font-lato xl:leading-normal\"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            Forecasting Your <br/> Way {" "}
            <span className="font-vujahday ">Forward</span>
        </motion.h1>
        <motion.p 
          className="text-center leading-10 font-lato text-normal"
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
            <Button className="my-5 mr-5">Start Now</Button>
            <Link to="/home" className="font-lato">Learn more</Link>
        </motion.div>
      </div>  
      
    </div>
  );
};
export default Landing;


// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Landing = () => {
//   return (
//     <div className="container relative font-lato">
//       <div className="h-fit flex flex-col items-center md:py-0 text-customTextColor">
        
//         {/* Motion for heading */}
//         <motion.h1 
//           className="mt-20 text-center text-8xl font-normal leading-relaxed font-lato xl:leading-normal"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           Forecasting Your <br /> Way {" "}
//           <span className="font-vujahday">Forward</span>
//         </motion.h1>
        
//         {/* Motion for paragraph */}
//         <motion.p 
//           className="text-center leading-10 font-lato text-normal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           "Make Informed Decisions with <br /> Intelligent Predictions."
//         </motion.p>
        
//         {/* Motion for buttons */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.7, duration: 0.6 }}
//         >
//           <Button className="my-5 mr-5">Start Now</Button>
//           <Link to="/home" className="font-lato">Learn more</Link>
//         </motion.div>
        
//         {/* Motion for divider */}
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{ delay: 0.9, duration: 0.8 }}
//         >
//           <div className="h-24 w-screen bg-customCardColor"></div>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default Landing;

