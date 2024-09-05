import { Button } from "@/components/ui/button";
import restore from "../assets/logo_restore.png";
import { navigation } from "../constants";

const Header = () => {
  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-4 md:pt-4">
          <div className="" >
            <a>
              <img src={restore} />
            </a>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {
                navigation.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={item.url} 
                      className="inline-block py-1 px-3 hover:text-primary hover:shadow-[0_3px_0_-1px_hsl(var(--primary))] font-semibold">
                          {item.title}
                      </a>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <Button>Login</Button>
          </div>
        </div>
      </nav>
    </>
    // <div className="container flex justify-between items-center py-4 md:pt-4">
    //   <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
    //     <a className="block w-[12rem] xl:mr-8">
    //       <img src={restore}/>
    //     </a>
    //     <nav className="hidden fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:max-auto lg:bg-transparent">
    //       <div>
    //         {navigation.map((item) => (
    //           <a key={item.id} href={item.url}>
    //             {item.title}
    //           </a>
    //         ))}
    //       </div>
    //     </nav>
    //     <Button>Login</Button>
    //   </div>
    // </div>
  )
}

export default Header




// import { Button } from "@/components/ui/button";
// import restore from "../assets/logo_restore.png";
// import { navigation } from "../constants";

// const Header = () => {
//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-n-8/90 backdrop-blur-0-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
//       <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
//         <a className="block w-[12rem] xl:mr-8" href="#hero">
//             <img src={restore} />
//         </a>
//         <nav className="hidden fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:max-auto lg:bg-transparent">
//         <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
//             {navigation.map((item) =>(
//                 <a key={item.id} href={item.url} className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
//                 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold`}>
//                     {item.title}  
//                 </a>
//             ))}
//         </div>
//       </nav>

//         <Button className="hidden lg:flex">
//             Login
//         </Button>

      
 
//       </div>

      
        

//     </div>
//   )
// }

// export default Header

