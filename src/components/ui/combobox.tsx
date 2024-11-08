import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { axiosInstance } from "@/services/axios"
import {  useEffect, useState } from "react"

interface Record {
  Month: string; 
  UnitsSold: number;
}
interface Product {
  ProductID: string;
  Records: Record[]; 
  Product: string;
  Month: string;
}

interface Item {
  value: string;
  label: string;
}
interface ComboboxDemoProps {
  items: Product[];
  onSelect: (value: string) => void;
}

export function ComboboxDemo({ onSelect }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const username = localStorage.getItem("username");
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/Demand/demand/`, {
          params: { username: username }
        });
        if (response.data && Array.isArray(response.data)) {
          // Use a Set to track unique product names
          const seenProducts = new Set();

          const uniqueProducts = response.data.filter(product => {
            const productName = product.Records[0]?.Product;
            if (productName && !seenProducts.has(productName)) {
              seenProducts.add(productName);
              return true;
            }
            return false;
          }).map(product => ({
            value: product.ProductID.toString(), 
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


  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[190px] md:w-[250px] justify-between bg-white"
          >
            {value ? items.find((item) => item.value === value)?.label : "Select product..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[250px] w-[190px] p-0">
          <Command>
            {/* <CommandInput placeholder="Search product..." className="h-9" /> */}
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
                        onSelect(currentValue);
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