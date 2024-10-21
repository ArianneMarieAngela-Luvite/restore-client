
import { CardHeader, Card, CardTitle, CardContent } from "@/components/ui/card"
import restoreLogo from "../assets/restore-logo.png";

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";




const ConfirmEmail = () => {
  const navigate = useNavigate();

  const navigateLogin = () =>{
    navigate("/login");
  };

  return (
    <motion.div
      className="min-h-screen bg-background flex justify-center items-center shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="
        max-w-sm w-full h-3/4  p-5 
        xl:shadow
        lg:shadow 
        md:shadow
        sm:shadow 
        xs:bg-transparent  
        "
        >
        <CardHeader className="">

          <CardTitle className="
          text-2xl font-bold  items-center flex flex-row gap-3 font-rubik 
          xl:text-3xl 
          lg:text-3xl 
          md:text-3xl  
          ">
            <img src={restoreLogo} className="h-9 w-9" />
            <span className="font-bold text-2xl">Email Verification Successful! </span>
          </CardTitle>

          {/* <CardDescription
          className="flex flex-row text-normal font-base  items-center text-3xl font-bold font-rubik">
            
            
          </CardDescription> */}

        </CardHeader>
        <CardContent className="flex flex-col text-base leading-6" >
        Thank you for confirming your email address.

            <Button onClick={navigateLogin}  className="w-full text-sm mt-5" >
                Go to Login 
            </Button>

        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ConfirmEmail
