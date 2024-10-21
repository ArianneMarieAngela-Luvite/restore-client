import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Pricing() {

  return (
  <motion.div 
    className="container my-10 mb-14 mx-auto"
    id="pricing-alt"
    animate={{x:0}}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 }
    }}
  >
    <div className="flex flex-col justify-center items-center gap-3 w-full text-customTextColor">
      <div className="font-lato font-semibold text-5xl ">
        Choose what's best for you
      </div>
      <div className="text-lg py-3 mb-10">
        Trusted by freelancers, startups, micro, small, and medium enterprises all over the world
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-col rounded-sm  shadow-2xl p-8 gap-3 w-2/5">
          <p className="font-lato font-bold text-2xl">Pay-Per-Use</p>
          <p className="font-lato text-5xl font-bold py-3">79.00 <span className="text-lg font-normal">per use/credit</span></p>
          <p className="text-lg font-lato mb-3" >Ideal for businesses that need flexibility and control over their usage.</p>
          <div className="flex flex-col mb-3 font-lato  gap-4">
            <ul className="flex flex-col gap-3">
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>

                No Subscription Required
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
                On-Demand Forecasting
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
                Exportable Data
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
                Easy-to-Use Interface
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
                Scalable
              </li>
            </ul>
          </div>
          <Button className="h-10 rounded-lg">Connect with Us For Pricing</Button>
        </div>
        
        <div className="flex flex-col  text-customTextColor p-8 gap-3 w-5/12 rounded-sm shadow-md">
          <p className="font-lato font-bold text-2xl mb-2">
            Partnerships
          </p>
          {/* <p className="font-lato text-6xl font-bold mb-2 py-3">79.00 <span className="text-lg font-normal">/use</span></p> */}
          <p className="text-lg font-lato mb-4 " >
            
            Designed for companies looking to integrate ReStore into their existing platforms or services. 
            By partnering with us, you can embed 
            our powerful forecasting engine into your platform, making it a seamless 
            extension of your product.
          </p>

          <div className="mb-3 font-lato">
            <ul className="flex flex-col gap-4">
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>

              Custom API Integration
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
              Customizable Solutions
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
              Priority Technical Support
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
                Flexible Pricing
              </li>
              <li className="flex flex-row gap-2">
              <svg className="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
              </svg>
                Co-Marketing Opportunities
              </li>
            </ul>
          </div>
          <Button className="rounded-lg  h-10 ">
            Connect with Us For Pricing
          </Button>
        </div>
      </div>
    </div>
  </motion.div>

    
  );
}