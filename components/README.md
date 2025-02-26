# Components Directory Structure

This directory contains all React components used throughout the application. The structure is organized as follows:

## Directory Structure

```
components/
├── common/           # Shared components used across multiple features
│   ├── buttons/     # Button components
│   ├── icons/       # Icon components
│   └── layout/      # Layout components (header, footer, etc.)
├── features/        # Feature-specific components
│   ├── services/    # Service-related components
│   ├── booking/     # Booking-related components
│   └── locations/   # Location-related components
├── ui/              # UI components (from shadcn/ui)
└── layouts/         # Page layout components
```

## Component Categories

### Common Components
- Reusable components that are shared across multiple features
- Basic UI elements like buttons, icons, and layout components
- Should be highly reusable and not contain business logic

### Feature Components
- Components specific to a particular feature or domain
- Can contain business logic and feature-specific state
- Organized by feature domain (services, booking, etc.)

### UI Components
- Base UI components from shadcn/ui
- Styled according to our design system
- Should be kept as pure as possible

### Layout Components
- Page-level layout components
- Define the structure of different page types
- Handle responsive layout logic

## Best Practices

1. Keep components focused and single-responsibility
2. Use TypeScript for all components
3. Follow naming conventions:
   - PascalCase for component files
   - camelCase for utility files
4. Include proper documentation and typing
5. Keep business logic separate from presentation
6. Use composition over inheritance 