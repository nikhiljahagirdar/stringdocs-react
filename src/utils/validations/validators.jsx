export const validatePassword = (password) => {
  let passErrors = "";
  if (password.length < 8) {
    passErrors = "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    passErrors = 
      "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    passErrors =
      "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    passErrors = "Password must contain at least one number.";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    passErrors =
      "Password must contain at least one special character.";
  }

  return passErrors;
};

export const isValidNumberString = (str) => {
    // Checks if the string is a valid integer or decimal number (including negative numbers)
    return /^-?\d+(\.\d+)?$/.test(str);
};

export const convertStringToNumber = (str) => {
    // First ensure the string is a valid number
    if (isValidNumberString(str)) {
        return Number(str);
    }
    throw new Error("Invalid number string");
};

export const convertNumberToString = (num) => {
    // Checks if the number is an integer or decimal number
    if (Number.isInteger(num)) {
        return num.toString();
    }
    throw new Error("Invalid number");
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const validateAlphabets = (string) => {
    return /^[a-zA-Z\s]+$/.test(string);
  };