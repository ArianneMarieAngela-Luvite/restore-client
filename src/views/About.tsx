import { cn } from "@/lib/utils";
import Marquee from "../components/ui/marquee";
import { Player } from '@lottiefiles/react-lottie-player';
// import bg from "../assets/b7.png";

export const feature = [
  {
    name: "Sales Forecasting",
    body:
      "Provides accurate sales predictions based on historical data, helping you plan ahead and manage resources efficiently.",
    img: "https://lottie.host/4bee81eb-bd8c-4145-b8e5-5e930048582a/zwnTRPHp9G.json",
    // link: "https://stripe.com",
  },
  {
    name: "Product Demand Forecasting",
    body:
      "Stay ahead of trends by predicting which products will be in high demand, ensuring youre always stocked with what your customers want.",
    // img: "https://lottie.host/41a809aa-179c-471e-b5a1-ccee9a7aa2d1/eujOc2sHZ7.json",
    img: "https://lottie.host/a9df2d62-26d1-43ec-bb33-6afac52ae91a/Oq1W3OFU8E.json",
  },
  {
    name: "Sales Insights",
    body:
      "Gain actionable insights into your sales performance, with reports that help you understand your strengths and areas for improvement",
    img: "https://lottie.host/f920c93a-1828-45b6-843f-7b506949156d/gyuFU9GuN8.json",
  },
  {
    name: "Visual Trend Analysis",
    body:
      "Easily visualize sales and demand data with our dynamic graphs, allowing you to quickly spot trends and capitalize on opportunities.",
    img: "https://lottie.host/178709c2-370a-43b8-9761-8abec7c9bb47/HtwkVBWLNt.json",
    // img: "https://lottie.host/41dc85ed-9243-4870-a9b5-94b465a746f4/NhJOooMj0D.json"
  },
  {
    name: "Exportable Reports",
   body:
      "Generate lightweight, exportable reports that provide clear insights into your sales and product demand, ready to share with your team or partners.",
    img: "https://lottie.host/7f68ff23-4fc3-4019-bb6d-8cb7c3be9476/zRLOTQcLnt.json",
  },

];


const firstRow = feature;
// const secondRow = feature.slice(feature.length / 4);

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-72 h-56 cursor-pointer overflow-hidden rounded-xl border p-5",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/* <img className="rounded-full" width="32" height="32" alt="" src={img} />
         */}
         
        <div className="flex flex-col justify-center items-center">
        <Player
          autoplay
          loop
          src={img}
          style={{ height: '52px', width: '52px', borderRadius: '10px' }}
        >
        </Player>
          <div className="text-base font-rubik  w-64 mt-2 text-center font-bold dark:text-white">
            {name}
          </div>
          {/* <p className="text-xs font-medium dark:text-white/40">{name}</p> */}
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-justify font-rubik">{body}</blockquote>
    </figure>
  );
};

export function About() {
  return (
      <div
      // style={{ backgroundImage: `url(${bg})` }}
      id="about"  className='isolate w-full '>
       <div  className="container mx-auto ">
         <div className="pt-16 pb-5">
           <div className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="mx-auto max-w-2xl lg:text-center">
               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
               What's in Store with ReStore?
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
               Whether you’re a small store or a growing business, ReStore equips you with the right tools to make smarter 
               decisions and uncover new opportunities.
               </p>
             </div>
             <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg my-10 ">
                <Marquee pauseOnHover className="[--duration:50s] shadow">
                  {firstRow.map((feature) => (
                    <ReviewCard key={feature.name} {...feature} />
                  ))}
                </Marquee>
                {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.name} {...review} />
                  ))}
                </Marquee> */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
              </div>

            </div>
         </div>
      </div>
     </div>

   
  );
}
