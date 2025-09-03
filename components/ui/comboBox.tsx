"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
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
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedFilters, setSelectedFilters] = React.useState<Filters | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedFilters ? <>{selectedFilters.label}</> : <>Select filters</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <FiltersList setOpen={setOpen} setSelectedFilters={setSelectedFilters} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedFilters ? <>{selectedFilters.label}</> : <>Select filters</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <FiltersList setOpen={setOpen} setSelectedFilters={setSelectedFilters} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function FiltersList({
  setOpen,
  setSelectedFilters,
}: {
  setOpen: (open: boolean) => void
  setSelectedFilters: (status: Filters | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filters.map((filter) => (
            <CommandItem
              key={filter.value}
              value={filter.value}
              onSelect={(value) => {
                setSelectedFilters(
                  filters.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {filter.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

