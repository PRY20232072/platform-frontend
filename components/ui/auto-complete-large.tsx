"use client";
import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FixedSizeList as List } from "react-window";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useDataList } from "@/hooks/useDataLIst";

interface CustomAutocompleteProps {
  label: string;
  labelPlacement: any;
  placeholder?: string;
  data: { value: string; label: string }[];
  isDisabled: boolean;
  selectedKey: string;
  onSelectionChange?: (value: any) => void;
}

const CustomAutoCompleteLarge: React.FC<CustomAutocompleteProps> = ({
  label,
  labelPlacement,
  placeholder,
  data,
  isDisabled,
  selectedKey,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, hasMore, isLoading, onLoadMore } = useDataList({
    fetchDelay: 1000,
  });
  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });
  /* const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <AutocompleteItem
      key={data[index].value}
      value={data[index].value}
      style={style}
    >
      {data[index].label}
    </AutocompleteItem>
  ); */
  return (
    <div className='mb-4 w-full'>
      <Autocomplete
        isRequired
        isDisabled={isDisabled}
        label={label}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        selectedKey={selectedKey}
        allowsCustomValue={false}
        onSelectionChange={onSelectionChange}
        isLoading={isLoading}
        scrollRef={scrollerRef}
        onOpenChange={setIsOpen}
        defaultItems={items}
      >
        {/*       <List height={200} itemCount={data.length} itemSize={35} width='100%'>
          {Row}
        </List> */}
        {data.map((item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        ))}

        {/*   {(item: any) => (
          <AutocompleteItem key={item.code} value={item.code}>
            {item.code} - {item.description}
          </AutocompleteItem>
        )} */}
      </Autocomplete>
    </div>
  );
};

export { CustomAutoCompleteLarge };
