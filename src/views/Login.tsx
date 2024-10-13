import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Alert, AlertDescription} from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { LoginController } from "../controllers/LoginController";
import backIcon from "../assets/icons8-back-48.png";


export function Login() {
  const { formData, handleChange, handleSubmit, loading, errorMessage } = LoginController();

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
            <Link to="/" aria-label="Go back to home" className="flex hover:underline cursor-pointer">
              <img className="h-[15px] w-[22px]" src={backIcon} alt="Back icon"/>
              <span className="text-xs">Go back</span>
            </Link>

          <CardTitle className="
          text-2xl font-bold
          xl:text-3xl 
          lg:text-3xl 
          md:text-3xl  
          ">
            ReStore
          </CardTitle>

          <CardDescription
          className="text-sm">
            Welcome back! Start your day with ReStore!
          </CardDescription>

        </CardHeader>
        <CardContent className="px-10" >
          <form className="grid gap-4" onSubmit={handleSubmit} >

            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="xs:bg-customGreen text-sm"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="xs:bg-customGreen mb-1 text-sm"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

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
                  <span className="mr-2">Logging in</span>
                  <ClipLoader  size={18} color="white"/>                
                </div> ) : (
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
