"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { axiosInstance } from "@/services/axios"
import { useEffect, useState } from "react"
import { ProductGraphController } from "@/controllers/ProductGraphController"

interface Record {
  Month: string; // Assuming this is the format "MM/DD/YYYY"
  UnitsSold: number; // Assuming this is the number of units sold
}
interface Product {
  ProductID: number;
  Records: Record[]; // Updated to use the specific Record type
  Product: string;
  Month: string;
}

interface Item {
  // item: string;
  value: string;
  label: string;
}
interface ComboboxDemoProps {
  items: Product[];
  onSelect: (value: number) => void; // Define onSelect as a function that accepts a string
}

export function ComboboxDemo({ onSelect }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  // const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedProductID, setSelectedProductID] = useState<number | undefined>(undefined);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [parsedData, setParsedData] = useState<ParsedData[]>([]);

  // const {
  //   selectedYears,
  //   selectedProductID,
  //   parsedData,
  //   products
  // } = ProductGraphController();


  React.useEffect(() => {
    const fetchProducts = async () => {
      const username = localStorage.getItem("username");
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
        if (response.data && Array.isArray(response.data)) {
          // Use a Set to track unique product names
          const seenProducts = new Set();
          // const uniqueProducts = response.data.filter(product => {
          //   const productName = product.Records[0]?.Product;
          //   if (productName && !seenProducts.has(productName)) {
          //     seenProducts.add(productName);
          //     return true;
          //   }
          //   return false;
          // }).map(product => ({
          //   value: product.ProductID,
          //   label: product.Records[0]?.Product,
          // }));
          const uniqueProducts = response.data.filter(product => {
            const productName = product.Records[0]?.Product;
            if (productName && !seenProducts.has(productName)) {
              seenProducts.add(productName);
              return true;
            }
            return false;
          }).map(product => ({
            value: product.ProductID, // Ensure this is a string
            label: product.Records[0]?.Product,
          }));
          
          setItems(uniqueProducts);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  //       const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
  //       if (response.data && Array.isArray(response.data)) {
  //         // Use a Set to track unique product names
  //         const seenProducts = new Set();

  //         const uniqueProducts = response.data.filter(product => {
  //           const productName = product.Records[0]?.Product;
  //           if (productName && !seenProducts.has(productName)) {
  //             seenProducts.add(productName);
  //             return true;
  //           }
  //           return false;
  //         }).map(product => ({
  //           value: product.ProductID,
  //           label: product.Records[0]?.Product,
  //         }));
          
  //         setItems(uniqueProducts);
  //       } else {
  //         console.error("Unexpected response structure:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);


  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] xs:w-[300px] justify-between bg-white"
          >
            {value ? items.find((item) => item.value === value)?.label : "Select product..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] xs:w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search product..." className="h-9" />
            {loading ? (
              <div>Loading products...</div>
            ) : (
              <CommandList>
                <CommandEmpty>No product found.</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        onSelect(Number(currentValue));
                      }}
                    >
                      {item.label} 
                      <CheckIcon
                        className={`ml-auto h-4 w-4 ${value === item.value ? "opacity-100" : "opacity-0"}`}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}


// "use client"

// import * as React from "react"
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { axiosInstance } from "@/services/axios"

// interface Record {
//   Month: string; // Assuming this is the format "MM/DD/YYYY"
//   UnitsSold: number; // Assuming this is the number of units sold
// }

// interface Product {
//   ProductID: number;
//   Records: Record[]; // Updated to use the specific Record type
//   Product: string;
//   Month: string;
// }
// // Define the type for the props
// interface ComboboxDemoProps {
//   items: Product[];
//   onSelect: (value: number) => void; // Define onSelect as a function that accepts a string
// }

// export function ComboboxDemo({ onSelect }: ComboboxDemoProps) {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");
//   const [items, setItems] = React.useState<{ value: string; label: string; }[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const fetchProducts = async () => {
//       const username = localStorage.getItem("username");
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(`/api/Demand/demand/${username}`);
//         if (response.data && Array.isArray(response.data)) {
//           // Use a Set to track unique product names
//           const seenProducts = new Set();
//           // const uniqueProducts = response.data.filter(product => {
//           //   const productName = product.Records[0]?.Product;
//           //   if (productName && !seenProducts.has(productName)) {
//           //     seenProducts.add(productName);
//           //     return true;
//           //   }
//           //   return false;
//           // }).map(product => ({
//           //   value: product.ProductID,
//           //   label: product.Records[0]?.Product,
//           // }));
//           const uniqueProducts = response.data.filter(product => {
//             const productName = product.Records[0]?.Product;
//             if (productName && !seenProducts.has(productName)) {
//               seenProducts.add(productName);
//               return true;
//             }
//             return false;
//           }).map(product => ({
//             value: product.ProductID.toString(), // Ensure this is a string
//             label: product.Records[0]?.Product,
//           }));
          
//           setItems(uniqueProducts);
//         } else {
//           console.error("Unexpected response structure:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-[250px] xs:w-[300px] justify-between bg-white"
//           >
//             {value ? items.find((item) => item.value === value)?.label : "Select product..."}
//             <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[250px] xs:w-[300px] p-0">
//           <Command>
//             <CommandInput placeholder="Search product..." className="h-9" />
//             {loading ? (
//               <div>Loading products...</div>
//             ) : (
//               <CommandList>
//                 <CommandEmpty>No product found.</CommandEmpty>
//                 <CommandGroup>
//                   {items.map((item) => (
//                     <CommandItem
//                       key={item.value}
//                       value={item.value}
//                       onSelect={(currentValue) => {
//                         setValue(currentValue === value ? "" : currentValue);
//                         setOpen(false);
//                         onSelect(Number(currentValue));
                        
//                       }}
//                     >
//                       {item.label} 
//                       <CheckIcon
//                         className={`ml-auto h-4 w-4 ${value === item.value ? "opacity-100" : "opacity-0"}`}
//                       />
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             )}
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
