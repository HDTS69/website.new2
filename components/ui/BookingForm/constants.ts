'use client';

export const SERVICE_CATEGORIES = {
  'Plumbing': [
    'Leaking Taps',
    'Cistern Plumbing',
    'Burst Pipes',
    'Blocked Drains',
    'Blocked Toilets',
    'Water Filters',
    'Toilet Installation',
    'Bathroom Renovations',
    'Kitchen Plumbing',
    'Emergency Plumbing'
  ],
  'Gas Fitting': [
    'Gas BBQ Installation',
    'Gas Hot Water Systems',
    'Gas Leak Repairs',
    'Gas Cooktop Installation',
    'Gas Heater Installation',
    'Gas Safety Inspections',
    'Gas Line Installation',
    'Emergency Gas Services'
  ],
  'Roof Repairs': [
    'Leak Investigation',
    'Roof Report',
    'Roof Tile Repair',
    'Metal Roof Repairs',
    'Gutter Replacement',
    'Downpipe Installation',
    'Storm Damage Repair',
    'Emergency Roof Repairs'
  ],
  'Air Conditioning': [
    'Split System Installation',
    'AC Repairs',
    'AC Diagnostics',
    'AC Maintenance',
    'Ducted Air Installation',
    'Commercial AC Services',
    'AC Replacement',
    'Emergency AC Repairs'
  ]
} as const;

export const PREFERRED_TIMES = ['Morning', 'Afternoon', 'Weekend', 'After Hours'] as const;
export const URGENCY_OPTIONS = ['Emergency', 'Next Few Days', 'This Week', 'This Month'] as const;
export const DATE_RANGE_OPTIONS = ['Today', 'Tomorrow', 'This Week', 'Next Week'] as const; 