
import { CardHeader, Card, CardTitle, CardContent } from "@/components/ui/card"
import restoreLogo from "../assets/restore-logo.png";

import { motion } from "framer-motion"




const EmailVerification = () => {
  const email = localStorage.getItem("email");
  return (
    <motion.div
      className="min-h-screen  bg-background flex justify-center items-center shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="
        max-w-sm w-full border h-3/4  p-4 
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
            <span className="font-bold text-2xl">Email Confirmation </span>
          </CardTitle>

          {/* <CardDescription
          className="flex flex-row text-normal font-base  items-center text-3xl font-bold font-rubik">
            
            
          </CardDescription> */}

        </CardHeader>
        <CardContent className="flex flex-col text-base leading-6" >
        We've sent an email to <span className="font-bold text-base">{email}.</span> 
        Please check your inbox to activate your account. If you don't see the confirmation email there, be sure to check your Spam folder. Thank you!

            {/* <Button  className="w-full text-sm" >
                Login  
            </Button> */}

        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EmailVerification
