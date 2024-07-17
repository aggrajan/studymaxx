"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

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
import { Badge } from "../ui/badge"

interface OptionsType {
  [key: string]: boolean
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function FilterButton({optionArray, name} : { optionArray: string[], name: string }) {
  const allOptions = optionArray.map((option: string) => ({value: option, label: option}));
  const [open, setOpen] = React.useState(false)
  const options: OptionsType = allOptions.reduce((acc, obj) => ({...acc, [obj.value] : false}), {});
  const [value, setValue] = React.useState(options);
  const getSelectedOptions = (options: object) => {
    return Object.entries(options).filter(([_, value]) => (value === true)).map(([key, _]) => (key))
  }




  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-muted-foreground">Select {name}s:</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="p-5 overflow-x-auto overflow-y-hidden flex justify-between hover:bg-slate-100" 
            aria-expanded={open}
          >
            {getSelectedOptions(value).length > 0
              ? <div className="">
                {getSelectedOptions(value).map((option: string, index: number) => (
                    <Badge key={`filter_${index}`} variant="secondary" className="mx-[5px] rounded-full py-0 text-wrap bg-slate-300" onClick={(e) => {e.preventDefault(); setValue({...value, [option]: !value[option]})}}>
                      <div className="flex items-center"><div>{option}</div> <X width={15} className="ml-[1px]" /></div>
                    </Badge>
                  )
                )}
                </div>
              : `Select ${name}s...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${name}s...`} />
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandList>
              {allOptions.map((givenOption, index) => (
                <CommandItem
                  key={`option_${index}`}
                  className="cursor-pointer"
                  value={givenOption.value}
                  onSelect={(currentValue) => {
                    setValue({...value, [currentValue]: !value[currentValue]})
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value[givenOption.value] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {givenOption.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
