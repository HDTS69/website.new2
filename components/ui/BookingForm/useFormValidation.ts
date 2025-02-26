'use client';

import { useState, useCallback } from 'react';

interface ValidationRules {
  name: (value: string) => string | null;
  email: (value: string) => string | null;
  phone: (value: string) => string | null;
  address: (value: string) => string | null;
}

export const useFormValidation = (hasAttemptedSubmit: boolean) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validationRules: ValidationRules = {
    name: (value) => {
      if (!value.trim()) return 'Please enter your name';
      const names = value.trim().split(' ').filter(part => part.length > 0);
      return names.length < 2 ? 'Please enter both your first and last name' : null;
    },
    email: (value) => {
      if (!value.trim()) return 'Please enter your email address';
      // More comprehensive email regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailRegex.test(value.trim()) ? 'Please enter a valid email address' : null;
    },
    phone: (value) => {
      if (!value.trim()) return 'Please enter your phone number';
      // Australian phone number format: +61 or 0 followed by 4, 2, 3, 7, or 8, then 8 more digits
      // Allows for spaces, dashes, or no separators
      const phoneRegex = /^(?:\+61|0)[2-478](?:[ -]?\d{4}[ -]?\d{4}|\d{8})$/;
      return !phoneRegex.test(value.trim()) ? 'Please enter a valid Australian phone number' : null;
    },
    address: (value) => {
      return !value.trim() ? 'Please enter your address' : null;
    },
  };

  const validateField = useCallback((name: keyof ValidationRules, value: string) => {
    if (!hasAttemptedSubmit) return null;
    
    const validationRule = validationRules[name];
    const error = validationRule?.(value) || '';
    
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
    
    return error;
  }, [hasAttemptedSubmit]);

  const validateForm = useCallback((formData: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field as keyof ValidationRules](formData[field]) || '';
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, []);

  return {
    errors,
    validateField,
    validateForm,
  };
}; 