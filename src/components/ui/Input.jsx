import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  label,
  labelClass,
  inputClass,
  containerClass,
  errorClass,
  errorMessage,
  type,
  defaultValue,
  placeHolder,
  onChange,
  onBlur,
  onFocus,
  disabled,
  ariaDescribedby,
  ariaInvalid,
  ...rest
}) => {
  ;
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
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeHolder}
        className={`${inputClass} ${errorMessage ? 'border-red-500 focus:ring-red-500' : ''}`}
        value={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        {...rest}
      />
      {hasError && (
        <div className={errorClass} aria-live="assertive" aria-atomic="true">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  errorClass: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  ariaDescribedby: PropTypes.string,
  ariaInvalid: PropTypes.bool,
};



export default Input;