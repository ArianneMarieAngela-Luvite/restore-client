import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterController } from "../controllers/RegisterController";
// import backIcon from "../assets/icons8-back-48.png";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ClipLoader } from "react-spinners";
import restoreLogo from "../assets/restore-logo.png";

export function Register() {
  const { formData, handleChange, handleSubmit, loading, errorMessage } = RegisterController();

  return (
    <motion.div 
      className="min-h-screen bg-customBackground flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
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
          className="flex flex-col text-normal font-base gap-2 pb-2 text-center items-center">
            <span className="font-bold text-2xl">Join us! </span>
            Be a part of ReStore's success journey
          </CardDescription>

        </CardHeader>
        <CardContent className="px-10">
          <form onSubmit={handleSubmit} className="grid gap-4 ">
            <input
              id="email"
              type="email"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              id="name"
              type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              id="username"
              type="text"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              id="phoneNumber"
              type="text"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              id="password"
              type="password"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              id="verifyPassword"
              type="password"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Verify Password"
              value={formData.verifyPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
            

            {errorMessage && <Alert className="pt-4" variant={"destructive"}>
              <ExclamationTriangleIcon className="items-center" />
              <AlertDescription className="items-center">
                {errorMessage}
              </AlertDescription>
            </Alert>
            }

            <Button type="submit" className="w-full text-sm" disabled={loading}>
              {loading ?  (
                <div className="flex items-center">
                  <span className="mr-2">Register </span>
                  <ClipLoader  size={18} color="white"/>                
                </div> ) : (
                "Register"
                ) }
            </Button>
          </form>

          <div className="mt-5 text-center text-xs">
            Already have an account?{" "}
            <Link to="/login" className="underline font-bold text-green-600">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
