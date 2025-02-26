'use client';

import { useState, useCallback } from 'react';
import type { Service } from './types';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  manualEntry: boolean;
  services: Service[];
  preferredTime: "" | "Morning" | "Afternoon" | "Weekend" | "After Hours";
  urgency: "" | "Emergency" | "Next Few Days" | "This Week" | "This Month";
  preferredDate: string;
  preferredDateType: "specific" | "range" | null;
  preferredDateRange: "" | "Today" | "Tomorrow" | "This Week" | "Next Week" | null;
  message: string;
  files: File[];
  newsletter: boolean;
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  manualEntry: false,
  services: [],
  preferredTime: '',
  urgency: '',
  preferredDate: '',
  preferredDateType: null,
  preferredDateRange: null,
  message: '',
  files: [],
  newsletter: true,
  termsAccepted: false,
};

export const useFormState = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showThankYou, setShowThankYou] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('services.')) {
        const service = name.split('.')[1] as Service;
        setFormData(prev => ({
          ...prev,
          services: checkbox.checked 
            ? [...prev.services, service]
            : prev.services.filter(s => s !== service)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setIsSubmitting(false);
    setSubmitStatus('idle');
    setHasAttemptedSubmit(false);
  }, []);

  return {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    submitStatus,
    setSubmitStatus,
    showThankYou,
    setShowThankYou,
    hasAttemptedSubmit,
    setHasAttemptedSubmit,
    handleChange,
    resetForm,
  };
}; 