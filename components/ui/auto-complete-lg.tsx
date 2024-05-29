import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { ChevronDown, X } from "lucide-react";

interface AutocompleteLgProps {
  label: string;
  labelPlacement: any;
  placeholder?: string;
  data: { value: string; label: string }[];
  isDisabled: boolean;
  onChange?: (value: any) => void;
}

const AutocompleteLg: React.FC<AutocompleteLgProps> = ({
  label,
  labelPlacement,
  placeholder,
  data,
  isDisabled,
  onChange,
}) => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);
  const [selectedItem, setSelectedItem] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    console.log(value);
    setQuery(value);
    setFilteredItems(
      data.filter(
        (item) =>
          item.label.toLowerCase().includes(value.toLowerCase()) &&
          !item.value.toLowerCase().startsWith("cap")
      )
    );
    setIsListVisible(true);
  };
  const handleItemClick = (item: { value: string; label: string }) => {
    setSelectedItem(item);
    setQuery(item.label);
    setFilteredItems([]);
    setIsListVisible(false);
    if (onChange) {
      onChange(item.value);
    }
  };
  const handleInputClick = () => {
    setIsListVisible(true);
  };
  const handleClear = () => {
    setQuery("");
    setFilteredItems(data);
    setIsListVisible(false);
    setSelectedItem(null);
    if (onChange) {
      onChange("");
    }
  };
  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div
      style={style}
      key={index}
      className='cursor-pointer p-2 hover:bg-gray-200'
      onClick={() => handleItemClick(filteredItems[index])}
    >
      {filteredItems[index].label}
    </div>
  );

  return (
    <div>
      <Input
        label={label}
        labelPlacement={labelPlacement}
        placeholder={placeholder || "Busca un diagnóstico..."}
        value={query}
        onChange={handleInputChange}
        onClick={handleInputClick}
        fullWidth
        className='mb-2'
        endContent={
          (query && (
            <>
              <X onClick={handleClear} className='w-4 h-4 ml-4' />
              <ChevronDown
                className={`w-4 h-4 ml-4 ${isListVisible ? "rotate-180" : ""}`}
              />
            </>
          )) || (
            <ChevronDown
              className={`w-4 h-4 ${isListVisible ? "rotate-180" : ""}`}
            />
          )
        }
      />
      {isListVisible && filteredItems.length > 0 && (
        <div className='border border-gray-300 rounded mt-1 mb-2 overflow-hidden max-h-52'>
          <List
            height={350}
            itemCount={filteredItems.length}
            itemSize={52}
            width='100%'
          >
            {renderRow}
          </List>
        </div>
      )}
    </div>
  );
};

export default AutocompleteLg;
