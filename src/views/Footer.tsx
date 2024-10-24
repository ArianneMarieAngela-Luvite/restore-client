import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="">
        <div className="container border pt-20  mx-auto">
        <div className="flex flex-col justify-center items-center gap-2 mb-10">
            <div className="font-lato font-bold text-3xl pb-5 text-center">
                Feel connected anytime, anywhere
            </div>
            <div className="flex flex-row gap-2 mb-2">
                <Button>
                    Receive News
                </Button>
                <Button className="shadow-none border bg-white hover:bg-gray-100 text-customTextColor">
                    Contact us
                </Button>
            </div>
        </div>
        <Separator />
      <div className="flex justify-center  items-center p-5 sm:flex sm:items-center sm:justify-center pt-5">
            <span className="text-sm font-lato text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="https://restore-test.netlify.app/" className="hover:underline">ReStore™. </Link> All Rights Reserved.
            </span>
           
        </div>
    </div>
    </div>
    
  )
}

export default Footer
