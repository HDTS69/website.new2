'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface WaveInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextArea?: boolean;
  onHeightChange?: (height: number) => void;
}

export const WaveInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, WaveInputProps>(
  ({ label, error, className, isTextArea, onHeightChange, ...props }, ref) => {
    const Component = isTextArea ? 'textarea' : 'input';
    const labelChars = label.split('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isTextArea && onHeightChange) {
        e.target.style.height = 'inherit';
        onHeightChange(e.target.scrollHeight);
      }
      props.onChange?.(e);
    };

    return (
      <div className="wave-group relative">
        <Component
          {...props}
          ref={ref as any}
          onChange={handleChange}
          className={cn(
            "input focus:outline-none focus:ring-0",
            isTextArea && "resize-none overflow-hidden min-h-[40px]",
            error ? "border-[#00E6CA]" : "",
            className
          )}
          style={{ 
            backgroundColor: 'transparent',
            ...(props.style || {}) 
          }}
          placeholder=" "
        />
        <label htmlFor={props.id} className="label">
          {labelChars.map((char, index) => (
            <span
              key={index}
              className="label-char"
              style={{ '--index': index } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
        </label>
        {error && (
          <span className="validation-message text-red-500 text-xs absolute -bottom-5 left-0">
            {error}
          </span>
        )}
        <span className={cn("bar", error ? "bg-red-500" : "")}></span>
      </div>
    );
  }
); 