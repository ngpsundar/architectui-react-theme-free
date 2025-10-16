// src/Context/ValidationContext.jsx
import React, { createContext, useContext } from "react";
import { useValidation } from "../Hooks/useValidation";
import { ValidationRules } from "../utils/ValidationRules";

// Create the context
const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  // Get everything from the hook
  const validation = useValidation();

  return (
    <ValidationContext.Provider
      value={{
        ...validation,       // exposes formData, errors, validate, etc.
        rules: ValidationRules, // ensures common rules available everywhere
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

// Custom hook for consuming the context safely
export const useValidationContext = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error("useValidationContext must be used within ValidationProvider");
  }
  return context;
};
