"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

export function MultiSelectDropdown({
  heading,
  options,
  placeholder,
  onRemove,
  onSelect,
  selectedValues,
}: {
  heading: string;
  options: { id: string; label: string }[];
  placeholder?: string;
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
  selectedValues: string[];
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onRemove(value);
    } else {
      onSelect(value);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup heading={heading}>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => handleSelect(option.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedValues.includes(option.id)}
                      onCheckedChange={() => handleSelect(option.id)}
                    />
                    <span>{option.label}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedValues.includes(option.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
