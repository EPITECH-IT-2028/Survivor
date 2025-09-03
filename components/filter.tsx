import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
  value: string;
  label: string;
};

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

export function FiltersComboBoxResponsive({
  filtersList = filters,
  placeHolder,
  onSelection,
}: {
  filtersList: Filters[];
  placeHolder: Filters;
  onSelection: (value: UserRole) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedFilters, setSelectedFilters] = React.useState<Filters | null>(
    null
  );

  const handleFilterChange = (newValue: Filters | null) => {
    setSelectedFilters(newValue);
  };

  React.useEffect(() => {
    console.log(selectedFilters?.value);
    if (selectedFilters) {
      console.log(selectedFilters.value);
      onSelection(selectedFilters.value as UserRole);
    }
  }, [selectedFilters]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
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
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filtersList?.map((filter) => (
            <CommandItem
              key={filter.value}
              value={filter.value}
              onSelect={(value) => {
                setSelectedFilters(
                  filtersList.find((filter) => filter.value === value) || null
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
