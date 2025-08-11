import React,{useState} from "react";
import PropTypes from 'prop-types';
export default function InputPills({ labelText, placeholder, onPillsChange, labelClass, text, textClass }) {
  const [pills, setPills] = useState([...text]);
  const [inputValue, setInputValue] = useState("");

  const addPill = (e) => {
    e.preventDefault();
    const newPills = [...pills];
    const commaSeparatedValues = inputValue.split(",");
    commaSeparatedValues.forEach((value) => {
      const trimmedValue = value.trim();
      if (trimmedValue && !newPills.includes(trimmedValue)) {
        newPills.push(trimmedValue);
      }
    });
    setPills(newPills);
    setInputValue("");
    onPillsChange && onPillsChange(newPills);
  };

  const removePill = (index) => {
    const newPills = pills.filter((_, i) => i !== index);
    setPills(newPills);
    onPillsChange && onPillsChange(newPills);
  };

  return (
    <div>
      {labelText && <label className={labelClass}>{labelText}</label>}
      <input
        type="text"
        className={textClass}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addPill(e);
          }
        }}
      />
      <span className="flex flex-wrap gap-2 mb-2 mt-2">
        {pills.map((pill, index) => (
          <div
            key={index}
            className="flex items-center bg-indigo-300 text-white px-3 py-1 rounded-full text-2xs"
          >
            <span className="mr-2">{pill}</span>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => removePill(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </span>
    </div>
  );
}
InputPills.propTypes = {
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  onPillsChange: PropTypes.func,
  labelClass: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.string),
  textClass: PropTypes.string,
};


