import * as React from "react";

import { useMediaQuery } from "@/app/hooks/mediaQuery/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserRole } from "@/app/types/users";

type Filters = {
  value: string
  label: string
}

const filters: Filters[] = [
  {
    value: "sector",
    label: "Sector",
  },
  {
    value: "maturity",
    label: "Maturity",
  },
  {
    value: "location",
    label: "Location",
  },
];

export function FiltersComboBoxResponsive() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedFilters, setSelectedFilters] = React.useState<Filters | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[150px] justify-start"
            disabled={disabled}
          >
            {selectedFilters ? (
              <>{selectedFilters.label}</>
            ) : (
              <>{placeHolder.label}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <FiltersList
            setOpen={setOpen}
            setSelectedFilters={handleFilterChange}
            filtersList={filtersList}
          />
        </PopoverContent>
      </Popover>
    );
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
          <FiltersList
            setOpen={setOpen}
            setSelectedFilters={handleFilterChange}
            filtersList={filtersList}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function FiltersList({
  setOpen,
  setSelectedFilters,
  filtersList = filters,
}: {
  setOpen: (open: boolean) => void;
  setSelectedFilters: (status: Filters | null) => void;
  filtersList?: Filters[];
}) {
  return (
    <Command>
      <CommandList>
        <CommandInput placeholder="Filter status..." />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filtersList?.map((filter) => (
            <CommandItem
              key={filter.label}
              value={filter.label.toString()}
              onSelect={(value) => {
                setSelectedFilters(
                  filtersList.find(
                    (filter) => filter.label.toString() === value
                  ) || null
                );
                setOpen(false);
              }}
            >
              {filter.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
