"use client";

import * as React from "react";
import { format, startOfToday } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  name: string;
  min?: string;
  placeholder?: string;
  defaultValue?: string;
  onDateSelect?: (date: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function DatePicker({
  value,
  name,
  min,
  placeholder = "Select date",
  className,
  defaultValue,
  onDateSelect,
  isOpen = false, // Default to false if not provided
  onToggle,
  ...props
}: DatePickerProps) {
  const today = startOfToday();
  const [currentDate, setCurrentDate] = React.useState(value ? new Date(value) : today);
  const selectedDate = value ? new Date(value) : undefined;
  const minDate = min ? new Date(min) : today;
  const { pending } = useFormStatus();

  // Update current date view when value changes
  React.useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value));
    }
  }, [value]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleDateSelect = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const day = parseInt(e.currentTarget.getAttribute('data-day') || '0', 10);
    if (!day) return;

    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    if (newDate < minDate) {
      return;
    }

    // Format date as YYYY-MM-DD
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    
    if (onDateSelect) {
      onDateSelect(formattedDate);
    }
    
    // Close the popover after selection
    if (onToggle) {
      onToggle();
    }
  }, [currentDate, minDate, onDateSelect, onToggle]);

  const handlePrevMonth = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  }, [currentDate]);

  const handleNextMonth = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  }, [currentDate]);

  const handleQuickDateSelect = React.useCallback((date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (onDateSelect) {
      onDateSelect(formattedDate);
    }
    if (onToggle) {
      onToggle();
    }
  }, [onDateSelect, onToggle]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div {...props}>
      <input 
        type="hidden" 
        name={name} 
        id={`${name}-input`}
        defaultValue={defaultValue}
        aria-label={`Selected date: ${value ? format(new Date(value), "dd MMMM yyyy") : "No date selected"}`}
      />
      
      {/* Trigger Button */}
      <button
        type="button"
        id={`${name}-trigger`}
        aria-label={`Select date${value ? `, selected date is ${format(new Date(value), "dd MMMM yyyy")}` : ''}`}
        aria-expanded={isOpen}
        aria-controls={`${name}-calendar`}
        aria-haspopup="dialog"
        disabled={pending}
        className={cn(
          "w-full flex justify-between items-center rounded-md border border-gray-700 bg-[#141821] px-4 text-sm text-gray-300 shadow-sm hover:border-teal-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 h-10 dropdown-trigger",
          pending && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onToggle) {
            onToggle();
          }
        }}
      >
        <span className="text-gray-300">
          {value ? (() => {
            const selectedDate = new Date(value);
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);

            // Check if the selected date is the end of this week
            const endOfThisWeek = new Date(today);
            endOfThisWeek.setDate(today.getDate() + (6 - today.getDay()));
            const startOfThisWeek = new Date(today);
            startOfThisWeek.setDate(today.getDate() - today.getDay());

            // Check if the selected date is the end of next week
            const endOfNextWeek = new Date(today);
            endOfNextWeek.setDate(today.getDate() + (13 - today.getDay()));
            const startOfNextWeek = new Date(today);
            startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()));

            if (format(selectedDate, 'yyyy-MM-dd') === format(endOfThisWeek, 'yyyy-MM-dd')) {
              return `This Week (${format(startOfThisWeek, 'MMM d')} - ${format(endOfThisWeek, 'MMM d')})`;
            } else if (format(selectedDate, 'yyyy-MM-dd') === format(endOfNextWeek, 'yyyy-MM-dd')) {
              return `Next Week (${format(startOfNextWeek, 'MMM d')} - ${format(endOfNextWeek, 'MMM d')})`;
            }
            return format(selectedDate, "dd MMMM yyyy");
          })() : placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 text-gray-400 hover:text-teal-500 transition-colors" aria-hidden="true" />
      </button>
      
      {/* Calendar Dropdown */}
      {isOpen && (
        <div 
          id={`${name}-calendar`}
          role="dialog"
          aria-label="Date picker calendar"
          className="absolute z-50 mt-1 dropdown-content"
        >
          <div 
            className="bg-[#141821]/95 p-4 rounded-lg border border-gray-700/50 shadow-lg w-[280px] dropdown-backdrop"
            onClick={(e) => e.stopPropagation()}
            role="application"
            aria-label="Calendar"
          >
            <div className="px-3 mb-4" role="group" aria-label="Quick date selection">
              <div className="flex justify-between items-center space-x-2">
                <button
                  type="button"
                  id={`${name}-today`}
                  aria-label="Select today"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleQuickDateSelect(new Date());
                  }}
                  className="flex-1 py-1.5 text-sm text-teal-500 bg-[#1c2230] rounded hover:bg-[#252e3f] transition-colors hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#141821] active:transform active:scale-95"
                >
                  Today
                </button>
                <button
                  type="button"
                  id={`${name}-tomorrow`}
                  aria-label="Select tomorrow"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    handleQuickDateSelect(tomorrow);
                  }}
                  className="flex-1 py-1.5 text-sm text-teal-500 bg-[#1c2230] rounded hover:bg-[#252e3f] transition-colors hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#141821] active:transform active:scale-95"
                >
                  Tomorrow
                </button>
              </div>
              <div className="flex justify-between items-center space-x-2 mt-2">
                <button
                  type="button"
                  id={`${name}-this-week`}
                  aria-label="Select end of this week"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const thisWeek = new Date();
                    const endOfThisWeek = new Date(thisWeek);
                    // Adjust to end of week (Saturday)
                    endOfThisWeek.setDate(thisWeek.getDate() + (6 - thisWeek.getDay()));
                    handleQuickDateSelect(endOfThisWeek);
                  }}
                  className="flex-1 py-1.5 text-sm text-teal-500 bg-[#1c2230] rounded hover:bg-[#252e3f] transition-colors hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#141821] active:transform active:scale-95"
                >
                  This Week
                </button>
                <button
                  type="button"
                  id={`${name}-next-week`}
                  aria-label="Select next week"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const nextWeek = new Date();
                    const endOfNextWeek = new Date(nextWeek);
                    // Move to end of next week
                    endOfNextWeek.setDate(nextWeek.getDate() + (13 - nextWeek.getDay()));
                    handleQuickDateSelect(endOfNextWeek);
                  }}
                  className="flex-1 py-1.5 text-sm text-teal-500 bg-[#1c2230] rounded hover:bg-[#252e3f] transition-colors hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#141821] active:transform active:scale-95"
                >
                  Next Week
                </button>
              </div>
            </div>

            <div className="px-3 mb-4">
              <div className="text-xs text-gray-400" id={`${name}-calendar-label`}>Or select a specific date:</div>
            </div>

            <div className="flex items-center justify-between mb-4 calendar-navigation" role="group" aria-label="Calendar navigation">
              <button
                onClick={handlePrevMonth}
                type="button"
                id={`${name}-prev-month`}
                aria-label="Previous month"
                className="p-1 hover:bg-[#1c2230] rounded-md text-gray-400 hover:text-teal-500 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" data-testid="chevron-left" aria-hidden="true" />
              </button>
              <div className="text-gray-300 font-medium" role="heading" aria-live="polite" aria-atomic="true">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button
                onClick={handleNextMonth}
                type="button"
                id={`${name}-next-month`}
                aria-label="Next month"
                className="p-1 hover:bg-[#1c2230] rounded-md text-gray-400 hover:text-teal-500 transition-colors"
              >
                <ChevronRight className="h-4 w-4" data-testid="chevron-right" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2" role="row">
              {days.map((day) => (
                <div
                  key={day}
                  className="text-center text-[0.8rem] font-medium text-gray-400"
                  role="columnheader"
                  aria-label={day}
                >
                  {day}
                </div>
              ))}
            </div>

            <div 
              className="grid grid-cols-7 gap-1" 
              data-testid="calendar-grid"
              role="grid"
              aria-labelledby={`${name}-calendar-label`}
            >
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="h-8 w-8" 
                  role="gridcell" 
                  aria-hidden="true" 
                />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const currentDateToCheck = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                );
                const isDisabled = currentDateToCheck < minDate;
                const isSelected =
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentDate.getMonth() &&
                  selectedDate?.getFullYear() === currentDate.getFullYear();
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === currentDate.getMonth() &&
                  today.getFullYear() === currentDate.getFullYear();

                const formattedDate = format(currentDateToCheck, 'dd MMMM yyyy');

                return (
                  <button
                    key={day}
                    type="button"
                    id={`${name}-day-${day}`}
                    data-day={day}
                    onClick={handleDateSelect}
                    disabled={isDisabled || pending}
                    aria-label={`${formattedDate}${isToday ? ', Today' : ''}${isSelected ? ', Selected' : ''}`}
                    aria-selected={isSelected}
                    aria-disabled={isDisabled || pending}
                    aria-current={isToday ? 'date' : undefined}
                    role="gridcell"
                    tabIndex={isSelected ? 0 : -1}
                    className={cn(
                      "h-8 w-8 rounded-md flex items-center justify-center text-sm calendar-day",
                      "hover:bg-[#1c2230] hover:text-teal-400 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#141821]",
                      isSelected && "bg-teal-500 text-white hover:bg-teal-600 hover:text-white",
                      isToday && !isSelected && "bg-[#1c2230] text-teal-500 ring-2 ring-teal-500/30",
                      !isSelected && !isToday && "text-gray-300",
                      (isDisabled || pending) && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-300"
                    )}
                    data-testid={`calendar-day-${day}`}
                  >
                    <span aria-hidden="true">{day}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 