// src/utils/ValidationRules.js

export const ValidationRules = {
  required: {
    required: true,
    custom: (value) => (!value ? "This field is required" : null),
  },

  email: {
    required: true,
    type: "email",
    custom: (value) => {
      if (!value) return "Email is required";
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) return "Invalid email format";
      return null;
    },
  },

  password: {
    required: true,
    minLength: 6,
    custom: (value) => {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      if (!/[A-Z]/.test(value)) return "Must include at least one uppercase letter";
      if (!/[0-9]/.test(value)) return "Must include at least one number";
      if (!/[@$!%*?&#]/.test(value)) return "Must include a special character";
      return null;
    },
  },

  pan: {
    custom: (value) =>
      value && !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value)
        ? "Invalid PAN format (ABCDE1234F)"
        : null,
  },

  aadhar: {
    custom: (value) =>
      value && !/^\d{12}$/.test(value)
        ? "Aadhar number must be 12 digits"
        : null,
  },

  mobile: {
    required: true,
    custom: (value) => {
      if (!value) return "Mobile number is required";
      if (!/^[6-9]\d{9}$/.test(value))
        return "Invalid mobile number (should start with 6-9 and have 10 digits)";
      return null;
    },
  },

  dateBefore: (limitDate) => ({
    custom: (value) => {
      if (!value) return "Date is required";
      if (new Date(value) >= new Date(limitDate))
        return `Date must be before ${limitDate}`;
      return null;
    },
  }),

  dateAfter: (limitDate) => ({
    custom: (value) => {
      if (!value) return "Date is required";
      if (new Date(value) <= new Date(limitDate))
        return `Date must be after ${limitDate}`;
      return null;
    },
  }),
};
