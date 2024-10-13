import { motion } from "framer-motion";

export function Pricing() {
  return (
      <motion.div
        id="pricing"
        className="h-fit mt-24 min-h-[650px] relative font-lato p-12 "
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
      >
        <motion.div
          className="flex flex-col justify-center py-5 md:py-0 text-customTextColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-center font-lato xl:leading-normal xl:text-[65px] lg:text-[65px] md:text-[55px] sm:text-[45px] text-[32px] font-normal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Choose what's best for you
            </motion.h1>
            <motion.p
              className="text-center leading-6 font-lato p-2 text-[13px] lg:text-[17px] xl:text-[17px] md:text-[15px] sm:text-[13px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Used by freelancers, startups, companies, and enterprise-level corporations all over the world
            </motion.p>
            <div className="flex flex-col lg:flex-row xl:flex-row md:flex-row gap-8 mt-8 justify-center items-center">
              {["Option 1", "Option 2", "Option 3"].map((item, index) => (
                <motion.div
                  key={index}
                  className="sm:inline-block border h-96 w-[350px] rounded-xl border-gray-500"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.7 }}
                >
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    
  );
}