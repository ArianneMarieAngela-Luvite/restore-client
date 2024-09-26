import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginController } from "../controllers/LoginController"; // Ensure this path is correct

export function Login() {
  // Using LoginController to handle login logic
  const { formData, handleChange, handleSubmit, loading, errorMessage } = LoginController();

  return (
    <motion.div
      className="min-h-screen bg-customBackground flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="max-w-sm w-full h-3/4">
        <CardHeader className="mb-1 px-10">
          <CardTitle className="text-3xl font-bold">ReStore</CardTitle>
          <CardDescription>
            Welcome back! Start your day with ReStore!
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="bg-customGreen"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="bg-customGreen mb-1"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errorMessage && <div className="text-red-600 text-center mb-2">{errorMessage}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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
