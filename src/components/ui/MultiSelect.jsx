import React, { useState } from "react";
import PropTypes from "prop-types";

const MultiSelect = ({ options, placeHolder,onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      const newSelection = [...selectedItems, item];
      setSelectedItems(newSelection);
      onSelectionChange(selectedItems);
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleRemove = (item) => {
    const newSelection = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelection);
    onSelectionChange(selectedItems);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown= function(e) {
    if (e.keyCode === 27) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

 

  return (
    <div className="relative w-full  border-indigo-300 border-2">
      <div className="flex flex-wrap gap-2 p-2 ">
        {selectedItems.map((item) => (
          <span
            key={item}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1"
          >
            {item}
            <span role="button" onClick={() => handleRemove(item)} className="ml-1 text-xs">&times;</span>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 p-1 outline-none"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onKeyUp={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeHolder}
        />
      </div>
      {isOpen && searchTerm && (
        <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto z-50">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li key={option}><input type="checkbox" onClick={() => handleSelect(option)} onKeyUp={handleKeyDown}  />
              <span className="p-2">{option}</span>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeHolder: PropTypes.string,
  onSelectionChange: PropTypes.func.isRequired,
};


export default MultiSelect;

