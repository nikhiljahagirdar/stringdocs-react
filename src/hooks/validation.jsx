import { useState, useEffect } from 'react';
const useValidation = () => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return null;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      return 'Invalid phone number';
    }
    return null;
  };


  const validateNumbers = (numbers) => {
    const numbersRegex = /^[0-9]+$/;
    if (!numbersRegex.test(numbers)) {
      return 'Invalid numbers';
    }
    return null;
  };

  const validate = (values) => {
    const newErrors = {};

    newErrors.email = validateEmail(values.email);
    newErrors.phone = validatePhone(values.phone);
    newErrors.companyEmail = validateCompanyEmail(values.companyEmail);
    newErrors.numbers = validateNumbers(values.numbers);

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).every((key) => newErrors[key] === null));
  };

  return { errors, isValid, validate };
};

export default useValidation;