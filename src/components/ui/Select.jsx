import React from 'react';
import PropTypes from 'prop-types';


const Select = ({
  id,
  name,
  label,
  initOption,
  containerClass,
  selectClass,
  labelClass,
  errorClass,
  errorMessage,
  options,
  value,
  onChange,
  onClick,
  onBlur,
  onFocus,
  disabled,
  ariaDescribedby,
  ariaInvalid,
  ...rest
}) => {
  
  console.log("from select",errorMessage)
 const hasLabel = label && label.length > 0;
const hasError = errorMessage && errorMessage.length > 0;



  return (
    <div className={containerClass}>
      {hasLabel && (
        <label
          htmlFor={id}
          className={labelClass} 
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        className= {`${selectClass}` }
        defaultValue={value}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        {...rest}
      >
        <option value="">{initOption}</option>
        {options && options.length>0 &&  options.map((option,index) => (
          <option key={`${name}-${index}-${option.value}`} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div className={errorClass} aria-live="assertive" aria-atomic="true">
          {errorMessage}
        </div>
      )}
     
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  initOption: PropTypes.string,
  labelClass: PropTypes.string,
  selectClass: PropTypes.string,
  errorClass: PropTypes.string,
  errorMessage: PropTypes.string,
  containerClass: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick:PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  ariaDescribedby: PropTypes.string,
  ariaInvalid: PropTypes.bool,
};



export default Select;