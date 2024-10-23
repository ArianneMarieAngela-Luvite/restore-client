// import { Separator } from "@/components/ui/separator";
import idul from "../assets/christian1.jfif";
import amara from "../assets/amara.jpg";
import hermi from "../assets/hermi.jpg";
import { motion } from "framer-motion";
// import { WobbleCard } from "@/components/ui/wobble-card";

const Idul = {
    github: "https://github.com/JohnChristianIdul",
    linkedIn: "https://www.linkedin.com/in/john-christian-idul-a670042ba/",
    gmail: "mailto:johnchristian.idul@cit.edu"
};

const Amara = {
    github: "https://github.com/ArianneMarieAngela-Luvite",
    linkedIn: "https://www.linkedin.com/in/arianne-marie-angela-luvite-a20861267/",
    gmail: "mailto:arianne.luvite@gmail.com"
}

const Hermi = {
    github: "https://github.com/Herminigildo-Timtim",
    linkedIn: "https://www.linkedin.com/in/herminigildo-timtim-43a7b0298/",
    gmail: "mailto:herminigildo.timtim@cit.edu"
}

const containerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.60,
        }
    }
}

const cardVariant = {
    hidden: { opacity: 0 }, 
    show: { opacity: 1 }
}
const Team = () => {
  return (


    <div id="team" className=" bg-background ">
        <div
        className="container  mx-auto ">
            <motion.div 
            variants={containerVariant}
            // initial="hidden"
            // animate="show"
            animate={{x:0}}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                ease: "linear",
                duration: 2,
                x: { duration: 1 }
            }}
                className="flex flex-col py-12   md:px-20  md:gap-14 "
                
                >
                <motion.div
                variants={cardVariant}
                // initial={{ opacity: 0, y: -50 }}
                // animate={{ opacity: 1, y:0 }}
                // transition={{ duration: 0.5, ease: "easeOut", delay: 0.8}}
                className="flex flex-col w-full  justify-center items-center px-5 md:px-10 ">
                    
                    {/* <div className="text-3xl w-full font-bold text-center leading-snug">
                        About the team
                    </div>
                    <p className=" leading-8 text-lg w-full text-center">
                        We are a team of passionate 4th-year Computer Science students driven by a shared goal
                        to empower MSMEs with the tools they need to succeed.  We believe 
                        in the power of innovation to transform businesses, and we're committed 
                        to providing smart, data-driven solutions that help small and medium 
                        enterprises thrive.
                    </p> */}
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                            About the team
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
                            We are a team of passionate 4th-year Computer Science students driven by a shared goal
                            to empower MSMEs with the tools they need to succeed.  We believe 
                            in the power of innovation to transform businesses, and we're committed 
                            to providing smart, data-driven solutions that help small and medium 
                            enterprises thrive.
                        </p>
                    </div>

                </motion.div>
                
                <motion.div 
                
                className="flex flex-col text-center mt-6 md:mt-0 lg:flex-row  lg:pt-0 items-center w-full  gap-8 font-lato justify-center">
                    
                    <motion.div className="flex flex-col w-80 md:w-1/4 shadow-primary/70 bg-primary/10 rounded-lg shadow-lg bg-gray-100 text-black items-center py-9 gap-6 "
                    variants={cardVariant}
                    // initial= {{ opacity: 0 }}
                    // animate={{ opacity: 1}}
                    // transition={{ duration: .5, ease: "easeIn", delay: 0.4}}

                    >
                        
                        <div className="flex flex-col w-80  items-center">
                            
                            <img src={idul} className="h-48 w-48 rounded-full shadow-lg mb-5"/>
                            <span className="font-bold text-xl text-center">John Christian Idul</span>
                            <span className="text-lg">Co-founder</span>
                            
                            <div className="mt-5 flex gap-3">
                                <svg 
                                    className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
                                    onClick={() => window.open(Idul.github, "_blank")} 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    style={{ pointerEvents: "auto" }} 
                                    viewBox="0 0 24 24">
                                        
                                    <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                                </svg>

                                <svg 
                                    className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
                                    onClick={() => window.open(Idul.linkedIn, "_blank")} 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    style={{ pointerEvents: "auto" }} 
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                                </svg>
                                <svg 
                                    onClick={() => window.open(Idul.gmail, "_blank")}
                                    className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    style={{ pointerEvents: "auto" }} 
                                    viewBox="0 0 24 24">
                                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                                </svg>
                            </div>
                            
                        </div>
                    </motion.div>
                    
                    {/* <Separator /> */}
                    <motion.div 
                    variants={cardVariant}
                    className="flex flex-col w-80 md:w-1/4 shadow-primary/70 bg-primary/10 rounded-lg shadow-lg bg-gray-100 text-black items-center py-9 gap-6">
                        
                        <div className="flex flex-col items-center">
                            <img src={amara} className="h-48 w-48 rounded-full mb-4 shadow-lg"/>
                            <span className="font-bold text-xl">Arianne Marie Angela Luvite</span>
                            <span className="text-lg">Co-founder</span>
                            <div className="mt-5 flex gap-3">
                                <svg 
                                    className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
                                    onClick={() => window.open(Amara.github, "_blank")} 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                                </svg>

                                <svg 
                                    className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
                                    onClick={() => window.open(Amara.linkedIn, "_blank")} 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                                </svg>
                                <svg 
                                    onClick={() => window.open(Amara.gmail, "_blank")}
                                    className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24">
                                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                                </svg>
                            </div>
                        </div>
                        
                    </motion.div>
                    {/* <Separator /> */}
                    <motion.div 
                    variants={cardVariant}
                    className="flex flex-col w-80 md:w-1/4 text-black items-center py-9 gap-6 shadow-lg shadow-primary/70 bg-primary/10 rounded-lg">
                        
                        <div className="flex flex-col items-center">
                            <img src={hermi} className="h-48 w-48 mb-4 rounded-full shadow-lg"/>
                            <span className="font-bold text-xl">Herminigildo Timtim Jr.</span>
                            <span className="text-lg">Co-founder</span>
                            <div className=" mt-5 flex gap-2">
                                <svg 
                                    className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
                                    onClick={() => window.open(Hermi.github, "_blank")} 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                                </svg>

                                <svg 
                                    className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
                                    onClick={() => window.open(Hermi.linkedIn, "_blank")} 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                                </svg>
                                <svg 
                                    onClick={() => window.open(Hermi.gmail, "_blank")}
                                    className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24">
                                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                                </svg>                
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}

export default Team


    // <div className="">
    //     <div className="container mx-auto my-10">
    //         <motion.div className="flex justify-center py-8   px-20 items-center  text-customTextColor "
    //             animate={{ x: 0 }} 
    //             initial={{ opacity: 0 }}
    //             whileInView={{ opacity: 1 }}
    //             transition={{
    //                 ease: "linear",
    //                 duration: 2,
    //                 x: { duration: 1 }
    //             }}
    //             >
    //             <div className="flex flex-col gap-3  w-screen h-80% p-5 font-lato px-10">
    //                 <h1 className="text-6xl  p-4  font-vujahday font-bold text-customTextColor leading-snug">
    //                     Driven by Data, <br/> Powered by Purpose
    //                 </h1>
    //                 <p className="mx-7 mr-16  leading-7 text-lg text-justify">
    //                     We are more than just a forecasting platform.
    //                     It is built for MSMEs, offering easy-to-use, 
    //                     AI-powered tools that transform how you predict sales, 
    //                     manage demand, and plan for growth. 
    //                 </p>
    //                 <p className="mx-7 mr-16  leading-7 text-lg text-justify">
    //                     With a team that is passionate about innovation and 
    //                     business impact, we are here to empower you with 
    //                     insights that matter, guiding you to new 
    //                     opportunities in this constantly changing world.
    //                 </p>

    //             </div>
                
    //             <div className="flex flex-col w-screen h-80% p-5 gap-5 font-lato ">
    //                 <div className="flex h-44 w-full items-center p-3 gap-6 ">
    //                     <img src={idul} className="h-36 w-36 rounded-full shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-lg">John Christian Idul</span>
    //                         <span>Co-founder</span>
    //                         <div className="my-3 flex gap-3">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Idul.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Idul.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Idul.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <Separator />
    //                 <div className="flex h-44 w-full items-center p-3 gap-6">
    //                     <img src={amara} className="h-36 w-36 rounded-full  shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-lg">Arianne Marie Angela Luvite</span>
    //                         <span>Co-founder</span>
    //                         <div className="my-3 flex gap-3">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Amara.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Amara.linkedIn, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Amara.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>
    //                         </div>
    //                     </div>
                        
    //                 </div>
    //                 <Separator />
    //                 <div className="flex h-44 w-full items-center p-3 gap-6">
    //                     <img src={hermi} className="h-36 w-36 rounded-full shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-lg">Herminigildo Timtim Jr.</span>
    //                         <span>Co-founder</span>
    //                         <div className="my-3 flex gap-2">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Hermi.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Hermi.linkedIn, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Hermi.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>                
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </motion.div>
    //     </div>
    // </div>
    // <div className="">
    //     <div className="container border mx-auto my-10">
    //         <motion.div className="flex justify-center py-8   px-20 items-center  text-customTextColor "
    //             animate={{ x: 0 }} 
    //             initial={{ opacity: 0 }}
    //             whileInView={{ opacity: 1 }}
    //             transition={{
    //                 ease: "linear",
    //                 duration: 2,
    //                 x: { duration: 1 }
    //             }}
    //             >
    //             <div className="flex flex-col gap-3 justify-center items-center h-80% p-5 font-lato px-10">
    //                 <h1 className="text-6xl  p-4  font-lato font-bold text-customTextColor leading-snug">
    //                     Driven by Data, Powered by Purpose
    //                 </h1>
    //                 <p className="mx-7 mr-16 mb-5 leading-7 text-xl  text-justify">
    //                     We are more than just a forecasting platform.
    //                     It is built for MSMEs, offering easy-to-use, 
    //                     AI-powered tools that transform how you predict sales, 
    //                     manage demand, and plan for growth. 
    //                 </p>
    //                 <p className="mx-7 mr-16  leading-7 text-xl text-justify">
    //                     With a team that is passionate about innovation and 
    //                     business impact, we are here to empower you with 
    //                     insights that matter, guiding you to new 
    //                     opportunities in this constantly changing world.
    //                 </p>

    //             </div>
                
    //         </motion.div>
    //         <div className="flex p-10 font-bold justify-center items-center font-lato text-6xl">
    //                 Meet The Team
    //         </div>
    //         <div className="flex flex-row border  h-80% p-5 gap-5 font-lato ">
                
    //                 <div className="flex h-44 w-1/3 items-center p-3 gap-6 ">
    //                     <img src={idul} className="h-36 w-36 rounded-full shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-lg">John Christian Idul</span>
    //                         <span>Co-founder</span>
    //                         <div className="my-3 flex gap-3">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Idul.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Idul.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Idul.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 {/* <Separator /> */}
    //                 <div className="flex h-44 items-center w-1/3 p-3 gap-6">
    //                     <img src={amara} className="h-36 w-36 rounded-full  shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-lg">Arianne Marie Angela Luvite</span>
    //                         <span>Co-founder</span>
    //                         <div className="my-3 flex gap-3">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Amara.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Amara.linkedIn, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Amara.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>
    //                         </div>
    //                     </div>
                        
    //                 </div>
    //                 {/* <Separator /> */}
    //                 <div className="flex h-44  items-center p-3 gap-6">
    //                     <img src={hermi} className="h-36 w-36 rounded-full shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-lg">Herminigildo Timtim Jr.</span>
    //                         <span>Co-founder</span>
    //                         <div className="my-3 flex gap-2">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Hermi.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Hermi.linkedIn, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Hermi.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>                
    //                         </div>
    //                     </div>
    //                 </div>
    //         </div>
    //     </div>
    // </div>
    
    // <div className="">
    //     <div className="container mx-auto my-10">
    //         <motion.div 
    //             className="flex  py-8  px-20  text-customTextColor "
    //             animate={{ x: 0 }} 
    //             initial={{ opacity: 0 }}
    //             whileInView={{ opacity: 1 }}
    //             transition={{
    //                 ease: "linear",
    //                 duration: 2,
    //                 x: { duration: 1 }
    //             }}
    //             >
    //             <div className="flex flex-col w-2/4 gap-3  px-10 py-10">
                    
    //                 <div className="text-4xl  font-bold text-customTextColor leading-snug">
    //                     About the team
    //                 </div>
    //                 <p className="  leading-7 text-lg ">
    //                     We are a team of passionate 4th-year Computer Science students driven by a shared goal: 
    //                     to empower MSMEs with the tools they need to succeed.  We believe 
    //                     in the power of innovation to transform businesses, and we're committed 
    //                     to providing smart, data-driven solutions that help small and medium 
    //                     enterprises thrive.
    //                 </p>

    //             </div>
                
    //             <div className="flex flex-col  w-2/4 p-5 gap-5 font-lato ">
    //                 <div className="flex w-full  items-center p-3 gap-6 ">
    //                     <img src={idul} className="h-48 w-48 rounded-full shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-xl">John Christian Idul</span>
    //                         <span className="text-xl">Co-founder</span>
    //                         <div className="my-3 flex gap-3">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Idul.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Idul.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Idul.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <Separator />
    //                 <div className="flex  w-full items-center p-3 gap-6">
    //                     <img src={amara} className="h-48 w-48 rounded-full  shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-xl">Arianne Marie Angela Luvite</span>
    //                         <span className="text-xl">Co-founder</span>
    //                         <div className="my-3 flex gap-3">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Amara.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Amara.linkedIn, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Amara.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>
    //                         </div>
    //                     </div>
                        
    //                 </div>
    //                 <Separator />
    //                 <div className="flex w-full items-center p-3 gap-6">
    //                     <img src={hermi} className="h-48 w-48 rounded-full shadow-lg"/>
    //                     <div className="flex flex-col">
    //                         <span className="font-bold text-xl">Herminigildo Timtim Jr.</span>
    //                         <span className="text-xl">Co-founder</span>
    //                         <div className="my-3 flex gap-2">
    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white" 
    //                                 onClick={() => window.open(Hermi.github, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    //                             </svg>

    //                             <svg 
    //                                 className="w-6 h-6 text-customTextColor hover:text-gray-500  dark:text-white"
    //                                 onClick={() => window.open(Hermi.linkedIn, "_blank")} 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
    //                                 <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
    //                             </svg>
    //                             <svg 
    //                                 onClick={() => window.open(Hermi.gmail, "_blank")}
    //                                 className="h-6 rounded-xl text-customTextColor hover:text-gray-500 cursor-pointer" 
    //                                 aria-hidden="true" 
    //                                 xmlns="http://www.w3.org/2000/svg" 
    //                                 width="24" 
    //                                 height="24" 
    //                                 fill="currentColor" 
    //                                 viewBox="0 0 24 24">
    //                                 <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
    //                                 <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
    //                             </svg>                
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </motion.div>
    //     </div>
    // </div>