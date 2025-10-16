// src/Hooks/useValidation.jsx
import { useState, useCallback } from "react";
import { ValidationRules } from "../utils/ValidationRules";

/**
 * Custom hook for form validation without context dependency.
 * Ideal for individual components or small forms.
 */
export const useValidation = (initialValues = {}) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialValues || {});

  // --- Handle input changes ---
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // --- Validate function ---
  const validate = useCallback((fieldRules) => {
    const newErrors = {};
debugger;
    for (const field in fieldRules) {
      const rules = Array.isArray(fieldRules[field])
        ? fieldRules[field]
        : [fieldRules[field]];

      const value = formData[field];

      for (const rule of rules) {
        let message = null;

        // Functional rules
        if (typeof rule === "function") {
          message = rule(value);
        }
        // Object rules (with custom function)
        else if (typeof rule === "object" && rule.custom) {
          message = rule.custom(value);
        }

        if (message) {
          newErrors[field] = message;
          break; // stop at first failure
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // --- Validate individual field on blur/change ---
  const validateField = useCallback(
    (name, rules) => {
      const value = formData[name];
      const appliedRules = Array.isArray(rules) ? rules : [rules];

      for (const rule of appliedRules) {
        let message = null;

        if (typeof rule === "function") {
          message = rule(value);
        } else if (typeof rule === "object" && rule.custom) {
          message = rule.custom(value);
        }

        if (message) {
          setErrors((prev) => ({ ...prev, [name]: message }));
          return false;
        }
      }

      // Clear error if valid
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
      return true;
    },
    [formData]
  );

  // --- Reset form and errors ---
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    formData,
    errors,
    setFormData,
    setErrors,
    handleChange,
    validate,
    validateField,
    resetForm,
    rules: ValidationRules, // expose for convenience
  };
};
