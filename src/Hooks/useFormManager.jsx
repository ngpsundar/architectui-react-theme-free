import { useState } from "react";

/**
 * Custom reusable form manager hook.
 * Handles form data, loading state, and error messages.
 *
 * @param {Object} initialValues - initial form field values
 * @returns {Object} - { formData, handleChange, loading, setLoading, error, setError, resetForm }
 */
export const useFormManager = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ handle input change (works for all text, email, password, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ reset form
  const resetForm = () => {
    setFormData(initialValues);
    setError("");
    setLoading(false);
  };

  return {
    formData,
    setFormData,
    handleChange,
    loading,
    setLoading,
    error,
    setError,
    resetForm,
  };
};
