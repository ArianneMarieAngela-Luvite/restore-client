"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
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

const frameworks = [
  {
    value: "magic sarap",
    label: "Magic Sarap",
  },
  {
    value: "ariel",
    label: "Ariel",
  },
  {
    value: "keratin",
    label: "Keratin",
  },
  {
    value: "egg",
    label: "Egg",
  },
  {
    value: "hotdog",
    label: "Hotdog",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="">
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between bg-white"
                >
                {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "Select product..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder="Search product..." className="h-9" />
                <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                    {frameworks.map((framework) => (
                        <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                        }}
                        >
                        {framework.label}
                        <CheckIcon
                            className={cn(
                            "ml-auto h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                        />
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
    
  )
}
