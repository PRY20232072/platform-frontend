'use client';
import React from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface CustomAutocompleteProps {
  label: string;
  labelPlacement: any;
  placeholder: string;
  data: { value: string; label: string }[];
  isDisabled: boolean;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  labelPlacement,
  placeholder,
  data,
  isDisabled,
}) => (
  <div className="mb-4">
    <Autocomplete
      isDisabled={isDisabled}
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
    >
      {data.map((item) => (
        <AutocompleteItem key={item.value} value={item.value}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  </div>
);

export { CustomAutocomplete };
