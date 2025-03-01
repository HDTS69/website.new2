'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface WaveInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * The floating label text shown over the input/textarea.
   */
  label: string;

  /**
   * An optional error message displayed below the input.
   */
  error?: string;

  /**
   * If true, renders a <textarea> instead of <input>.
   */
  isTextArea?: boolean;

  /**
   * An optional callback that, if provided, will receive
   * the scrollHeight of the textarea on change.
   */
  onHeightChange?: (height: number) => void;
}

export const WaveInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  WaveInputProps
>(({
  label,
  error,
  className,
  isTextArea,
  onHeightChange,
  ...props
}, ref) => {
  // Determine which element to render
  const Component = isTextArea ? 'textarea' : 'input';

  // Split the label into individual characters for the "wave" effect
  const labelChars = label.split('');

  // Custom onChange to handle optional auto-resize for textareas
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isTextArea && onHeightChange) {
      // Reset height to allow shrinking, then set new height
      e.target.style.height = 'inherit';
      onHeightChange(e.target.scrollHeight);
    }
    // Call any external onChange passed in
    props.onChange?.(e);
  };

  return (
    <div className="wave-group relative">
      {/* The input or textarea itself */}
      <Component
        {...props}
        ref={ref as any}
        onChange={handleChange}
        placeholder=" "  // Needed so the label can float above
        className={cn(
          "input focus:outline-none focus:ring-0", // base classes
          isTextArea && "resize-none overflow-hidden min-h-[40px]", // textareas
          error ? "border-[#00E6CA]" : "", // border color if there's an error
          className
        )}
        style={{
          backgroundColor: 'transparent',
          ...(props.style || {})
        }}
      />

      {/* The wave/animated label. We wrap each char in a <span> for the wave effect. */}
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

      {/* If there's an error message, display it below the input */}
      {error && (
        <span className="validation-message text-red-500 text-xs absolute -bottom-5 left-0">
          {error}
        </span>
      )}

      {/* The bar beneath the input for the wave effect, tinted red if there's an error */}
      <span className={cn("bar", error ? "bg-red-500" : "")} />
    </div>
  );
});

WaveInput.displayName = 'WaveInput';
