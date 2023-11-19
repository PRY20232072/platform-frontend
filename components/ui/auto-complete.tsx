'use client';
import React from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface CustomAutocompleteProps {
  label: string;
  labelPlacement: any;
  placeholder: string;
  data: { value: string; label: string }[];
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  labelPlacement,
  placeholder,
  data,
}) => (
  <div className="mb-4">
    <Autocomplete
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
