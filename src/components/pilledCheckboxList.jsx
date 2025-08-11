
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

const PilledCheckboxList = ({ options, selected = [], onChange, name }) => {
  const [localSelected, setLocalSelected] = useState(selected);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleSelect = (option) => {
    const newSelected = localSelected.includes(option)
      ? localSelected.filter((item) => item !== option) // Remove if already selected
      : [...localSelected, option]; // Add new selection

    setLocalSelected(newSelected); // Update local state
    onChange(newSelected); // Notify parent
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <div key={option} className="relative">
          <input
            type="checkbox"
            id={`pill-${option}`}
            name={name}
            value={option}
            checked={localSelected.includes(option)}
            onChange={() => handleSelect(option)}
            className="hidden"
          />
          <label
            htmlFor={`pill-${option}`}
            className={`flex items-center h-8 cursor-pointer text-xs/2 border border-blue-500 rounded-full px-4 py-2 transition-colors duration-200 ${
              localSelected.includes(option)
                ? "bg-indigo-200 text-indigo-800" 
                : "bg-white text-indigo-500"
            }`}
          >
            {option}
            {localSelected.includes(option) && <Check  size={8} className="w-4 h-4 ml-2" />}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PilledCheckboxList;

