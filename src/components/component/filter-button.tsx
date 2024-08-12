"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
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
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addFilter, IFilter, removeFilter } from "@/lib/slices/searchAndFilterSlice"

export function FilterButton({optionArray, name} : { optionArray: string[], name: string }) {
  const filters = useAppSelector((state) => state.searchAndFilter.filters);
  const dispatch = useAppDispatch();
  const allOptions = optionArray.map((option: string) => ({value: option, label: option}));
  const [open, setOpen] = React.useState(false)
  
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-muted-foreground">Select {name}s:</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="p-5 overflow-x-auto overflow-y-hidden flex justify-between hover:bg-slate-100 rounded-sm" 
            aria-expanded={open}
          >
            {(filters[name as keyof IFilter]).length > 0
              ? <div className="">
                {(filters[name as keyof IFilter]).map((option: string, index: number) => (
                    <Badge key={`filter_${index}`} variant="secondary" className="mx-[5px] rounded-full py-0 text-wrap bg-slate-300" onClick={(e) => {e.preventDefault(); dispatch(removeFilter({name: name as keyof IFilter, value: option}))}}>
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
                    if(filters[name as keyof IFilter].includes(currentValue)) dispatch(removeFilter({name: name as keyof IFilter, value: currentValue}))
                    else dispatch(addFilter({name: name as keyof IFilter, value: currentValue}))
                    setOpen(false)
                  }}
                  disabled={name == "categorie" && filters[name as keyof IFilter].length > 0 && !filters[name as keyof IFilter].includes(givenOption.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      filters[name as keyof IFilter].includes(givenOption.value) ? "opacity-100" : "opacity-0"
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
