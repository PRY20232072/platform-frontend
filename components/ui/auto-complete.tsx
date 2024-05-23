"use client";
import React, { ChangeEventHandler } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

interface CustomAutocompleteProps {
  label: string;
  labelPlacement: any;
  placeholder?: string;
  data: { value: string; label: string }[];
  isDisabled: boolean;
  selectedKey: string;
  onSelectionChange?: (value: any) => void;
  errorMessage?: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  labelPlacement,
  placeholder,
  data,
  isDisabled,
  selectedKey,
  onSelectionChange,
  errorMessage,
}) => {
  return (
    <div className='mb-4'>
      <Autocomplete
        isDisabled={isDisabled}
        label={label}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        selectedKey={selectedKey}
        allowsCustomValue={false}
        onSelectionChange={onSelectionChange}
        errorMessage={errorMessage}
      >
        {data.map((item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export { CustomAutocomplete };
