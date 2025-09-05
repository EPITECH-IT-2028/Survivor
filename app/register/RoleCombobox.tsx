"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const role = [
  {
    value: "founder",
    label: "Founder",
  },
  {
    value: "investor",
    label: "Investor",
  },
];

interface RoleComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function RoleCombobox({
  value,
  onValueChange,
}: RoleComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mt-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? role.find((role) => role.value === value)?.label
              : "Select role..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search role..." className="h-9" />
            <CommandList>
              <CommandEmpty>No role found.</CommandEmpty>
              <CommandGroup>
                {role.map((role) => (
                  <CommandItem
                    key={role.value}
                    value={role.value}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {role.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === role.value ? "opacity-100" : "opacity-0",
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
  );
}
