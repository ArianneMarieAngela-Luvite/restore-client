import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterController } from "../controllers/RegisterController";
import backIcon from "../assets/icons8-back-48.png";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ClipLoader } from "react-spinners";

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
          <Link to="/" className="flex hover:underline cursor-pointer">
              <img className="h-[15px] w-[22px]" src={backIcon} alt="Back icon"/>
              <span className="text-xs">Go back</span>
            </Link>
            
          <CardTitle className="
          text-2xl font-bold
          xl:text-3xl 
          lg:text-3xl 
          md:text-3xl
          "
          >
            ReStore
          </CardTitle>

          <CardDescription className="text-sm">
            Enter your details to create a new account
          </CardDescription>

        </CardHeader>
        <CardContent className="px-10">
          <form onSubmit={handleSubmit} className="grid gap-4 ">
            <Input
              id="email"
              type="email"
              className="bg-customGreen text-sm"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <Input
              id="name"
              type="text"
              className="bg-customGreen text-sm"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <Input
              id="username"
              type="text"
              className="bg-customGreen text-sm"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <Input
              id="phoneNumber"
              type="number"
              className="bg-customGreen text-sm"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <Input
              id="password"
              type="password"
              className="bg-customGreen text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <Input
              id="verifyPassword"
              type="password"
              className="bg-customGreen text-sm"
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
