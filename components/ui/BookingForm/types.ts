'use client';

import { SERVICE_CATEGORIES, PREFERRED_TIMES, URGENCY_OPTIONS, DATE_RANGE_OPTIONS } from './constants';

export type ServiceCategory = keyof typeof SERVICE_CATEGORIES;
export type ServiceOption = typeof SERVICE_CATEGORIES[ServiceCategory][number];
export type Service = ServiceCategory | ServiceOption;
export type PreferredTime = typeof PREFERRED_TIMES[number];
export type UrgencyOption = typeof URGENCY_OPTIONS[number];
export type DateRangeOption = typeof DATE_RANGE_OPTIONS[number];

export interface BookingFormProps {
  brandName?: string;
  onStateChange?: (showThankYou: boolean) => void;
} 