/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/app/hooks/mediaQuery/use-media-query";
import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown } from "lucide-react";

export type Filters = {
  value: string;
  label: string;
};

export const filters = [
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
  disabled = false,
  className = "",
}: {
  filtersList: { value: any; label: any }[];
  placeHolder: { value: any; label: any };
  onSelection: (value: any) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedFilters, setSelectedFilters] = useState<{
    value: any;
    label: any;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFilterChange = (newValue: { value: any; label: any } | null) => {
    setSelectedFilters(newValue);
  };

  useEffect(() => {
    if (selectedFilters) {
      onSelection(selectedFilters.value as UserRole);
    }
  }, [selectedFilters, onSelection]);

  if (!isMounted) {
    return (
      <Button
        variant="outline"
        className="flex w-full justify-between"
        disabled
      >
        {placeHolder.label}
        <ChevronsUpDown className="opacity-50" />
      </Button>
    );
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex w-full justify-between"
            disabled={disabled}
          >
            {selectedFilters ? (
              <>{selectedFilters.label}</>
            ) : (
              <>{placeHolder.label}</>
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]" align="start">
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
  className = "",
}: {
  setOpen: (open: boolean) => void;
  setSelectedFilters: (status: Filters | null) => void;
  filtersList?: Filters[];
  className?: string;
}) {
  return (
    <Command className={className}>
      <CommandList>
        <CommandInput placeholder="Filter status..." />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filtersList?.map((filter) => (
            <CommandItem
              key={filter.value}
              value={filter.label.toString()}
              onSelect={(value) => {
                setSelectedFilters(
                  filtersList.find(
                    (filter) => filter.label.toString() === value,
                  ) || null,
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
