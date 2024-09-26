// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"

//   export function Register() {
//   return (
//     <motion.div 
//       className="min-h-screen bg-customBackground flex justify-center items-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Card className="mx-auto max-w-sm my-28">
//         <CardHeader className="px-10">
//           <CardTitle className="text-3xl font-bold">ReStore</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="px-10 ">
//           <div className="grid gap-5">
//           <div className="grid gap-2">
//               <Input
//                 id="email"
//                 type="email"
//                 className="bg-customGreen "
//                 placeholder="Email"
//                 required
//               />
//           </div>
//           <div className="grid gap-2">
//               <Input
//                 id="name"
//                 type="text"
//                 className="bg-customGreen "
//                 placeholder="Name"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Username"
//                 className="bg-customGreen"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Input
//                 id="phonenum"
//                 type="number"
//                 className="bg-customGreen "
//                 placeholder="Phone Number"
//                 required
//               />
//           </div>
//             <div className="grid gap-2">
//               <Input 
//                 id="password" 
//                 type="password" 
//                 placeholder="Password" 
//                 className="bg-customGreen mb-1" 
//                 required />
//             </div>
//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//           </div>
//           <div className="mt-5 text-center text-xs">
//             Already have an account?{" "}
//           <Link to="/login" className="underline font-bold text-green-600">Login</Link>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
    
//   )
// }


// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { RegisterController } from "../controllers/RegisterController";

// export function Register() {
//   const { formData, handleChange, handleSubmit, errorMessage } = RegisterController();

//   return (
//     <motion.div 
//       className="min-h-screen bg-customBackground flex justify-center items-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Card className="mx-auto max-w-sm my-28">
//         <CardHeader className="px-10">
//           <CardTitle className="text-3xl font-bold">ReStore</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="px-10 ">
//           <form onSubmit={handleSubmit} className="grid gap-5">
//             <div className="grid gap-2">
//               <Input
//                 id="email"
//                 type="email"
//                 className="bg-customGreen"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Input
//                 id="name"
//                 type="text"
//                 className="bg-customGreen"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Input
//                 id="username"
//                 type="text"
//                 className="bg-customGreen"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Input
//                 id="phonenum"
//                 type="number"
//                 className="bg-customGreen"
//                 placeholder="Phone Number"
//                 value={formData.phonenum}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Input
//                 id="password"
//                 type="password"
//                 className="bg-customGreen"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Register
//             </Button>
//             {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
//           </form>
//           <div className="mt-5 text-center text-xs">
//             Already have an account?{" "}
//             <Link to="/login" className="underline font-bold text-green-600">
//               Login
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterController } from "../controllers/RegisterController";

export function Register() {
  const { formData, handleChange, handleSubmit, errorMessage } = RegisterController();

  return (
    <motion.div 
      className="min-h-screen bg-customBackground flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="mx-auto max-w-sm my-28">
        <CardHeader className="px-10">
          <CardTitle className="text-3xl font-bold">ReStore</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-10">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <Input
              id="email"
              type="email"
              className="bg-customGreen"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              id="name"
              type="text"
              className="bg-customGreen"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              id="username"
              type="text"
              className="bg-customGreen"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              id="phoneNumber"
              type="number"
              className="bg-customGreen"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              type="password"
              className="bg-customGreen"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
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
