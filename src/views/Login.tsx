import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Alert, AlertDescription} from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { LoginController } from "../controllers/LoginController";
// import backIcon from "../assets/icons8-back-48.png";
import restoreLogo from "../assets/restore-logo.png";


export function Login() {
  const { formData, handleChange, handleSubmit, loading, message } = LoginController();

  return (
    
    <motion.div
      className="min-h-screen bg-customBackground flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {loading && (
            <motion.div
              // initial={{ x: "100%" }}
              // animate={{ x: 0 }}
              // exit={{ opacity: "100%" }}
              // transition={{ duration: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-customBackground"
            >
              <Audio color="#30a75f" height={100} width={100} ariaLabel="loading" />
            </motion.div>
      )}

    
      <Card className="
        max-w-sm w-full h-3/4 
        xl:shadow
        lg:shadow 
        md:shadow
        sm:shadow 
        xs:bg-transparent  
        "
        >
        <CardHeader className="px-10">
            <Link to="/" aria-label="Go back to home" className="flex flex-row items-center gap-1 hover:underline cursor-pointer">
               <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
              </svg>

              <span className="text-xs">Go back</span>
            </Link>

          <CardTitle className="
          text-2xl font-bold py-5 items-center flex justify-center
          xl:text-3xl 
          lg:text-3xl 
          md:text-3xl  
          ">
            <img src={restoreLogo} className="h-14 w-14" />
          </CardTitle>

          <CardDescription
          className="flex flex-col text-normal font-base gap-2 pb-2 items-center">
            <span className="font-bold text-2xl">Welcome back! </span>
            Ready to turn your data into profits?
          </CardDescription>

        </CardHeader>
        <CardContent className="px-10" >
          <form className="grid gap-4" onSubmit={handleSubmit} >

            <div className="grid gap-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {message && <Alert className="pt-4" variant={"destructive"}>
              <ExclamationTriangleIcon className="items-center" />
              <AlertDescription className="items-center">
                {message}
              </AlertDescription>
            </Alert>
            }

            <Button type="submit" className="w-full text-sm" disabled={loading}>
              {loading ?  (
                <div className="flex items-center">
                  {/* <span className="mr-2">Logging in</span>
                  <ClipLoader  size={18} color="white"/>                 */}
                </div> 
                ) : (
                "Login"
                ) }
            </Button>
          </form>

          <div className="mt-5 text-center text-xs">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline font-bold text-green-600">
              Register
            </Link>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
