# Ecommerce

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

---

## Project Folder Structure

This project follows a scalable and maintainable folder structure designed for medium-sized Angular applications. Below is an overview of the architecture and guidelines for the team.

### Folder Architecture Overview

```
src/app/
├── core/
│   ├── guards/
│   ├── interceptors/
│   ├── services/
│   ├── models/
│   └── constants/
├── shared/
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   ├── validators/
│   └── utils/
├── features/
└── layouts/
```

---

## Folder Descriptions and Usage Guidelines

### 1. Core Module (`src/app/core/`)

The core folder contains singleton services and application-wide functionality that should only be instantiated once throughout the application lifecycle.

#### What belongs here:

- **guards/** — Route guards for authentication, authorization, and role-based access control
- **interceptors/** — HTTP interceptors for handling authentication tokens, error handling, logging, and request/response transformations
- **services/** — Singleton services such as authentication service, user service, API base service, and notification service
- **models/** — TypeScript interfaces and types that represent data structures used across the entire application
- **constants/** — Application-wide constants, environment configurations, API endpoints, and enum definitions

#### Team Guidelines:

- Services in this folder should be provided at the root level
- Never import Core module into feature modules; it should only be imported once in the main app configuration
- All HTTP interceptors must be registered in the app configuration
- Keep models generic and reusable; feature-specific models should stay in their respective feature folders

---

### 2. Shared Module (`src/app/shared/`)

The shared folder contains reusable components, directives, pipes, and utilities that can be used across multiple feature modules.

#### What belongs here:

- **components/** — Reusable UI components such as buttons, modals, cards, tables, loaders, form inputs, and pagination
- **directives/** — Custom attribute and structural directives for DOM manipulation
- **pipes/** — Custom pipes for data transformation in templates
- **validators/** — Custom form validators for reactive and template-driven forms
- **utils/** — Helper functions, utility classes, and common logic

#### Team Guidelines:

- Every component here must be standalone and self-contained
- Components should be highly configurable through inputs and outputs
- Avoid business logic in shared components; keep them purely presentational
- Document all inputs, outputs, and usage examples for each shared component
- Before creating a new shared component, check if one already exists that can be extended

---

### 3. Features Module (`src/app/features/`)

The features folder contains all the business feature modules of the application. Each feature represents a distinct section or functionality of the e-commerce platform.

#### Recommended Feature Structure:

For each feature, create a subfolder with its own internal structure:

- components/ — Feature-specific components
- services/ — Feature-specific services
- models/ — Feature-specific interfaces and types
- pages/ — Route-level page components

#### Example Features for E-commerce:

- products/ — Product listing, details, and search
- cart/ — Shopping cart management
- checkout/ — Checkout process and payment
- orders/ — Order history and tracking
- auth/ — Login, registration, and password recovery
- user-profile/ — User account settings and preferences
- wishlist/ — Saved items and favorites
- admin/ — Admin dashboard and management

#### Team Guidelines:

- Each feature should be self-contained and lazy-loaded for performance
- Feature modules should only import from Core and Shared, never from other features
- If multiple features need the same functionality, move it to Shared
- Keep feature routing configurations within the feature folder
- Name feature folders using kebab-case

---

### 4. Layouts Module (`src/app/layouts/`)

The layouts folder contains structural layout components that define the overall page structure and navigation.

#### What belongs here:

- Main application layout with header, footer, and sidebar
- Admin dashboard layout
- Authentication layout for login and registration pages
- Error page layouts
- Print-friendly layouts

#### Team Guidelines:

- Layouts should focus on structure and navigation only
- Use router outlets within layouts for content projection
- Keep layouts minimal and delegate content to feature components
- Create separate layouts for different user experiences

---

## How to Add New Elements

### Adding a New Feature

1. Navigate to the features folder
2. Use Angular CLI to generate a new feature module with routing
3. Create the internal structure with components, services, and pages subfolders
4. Configure lazy loading in the main app routes
5. Import only Core and Shared dependencies as needed

### Adding a New Shared Component

1. Navigate to the shared/components folder
2. Use Angular CLI to generate a standalone component
3. Ensure the component is generic and reusable
4. Add appropriate inputs and outputs for customization
5. Export the component if using a shared module approach

### Adding a New Service

1. Determine if the service is application-wide or feature-specific
2. For global services, add to core/services
3. For feature services, add to the specific feature/services folder
4. Use the providedIn root option for singleton services

### Adding a New Guard

1. Navigate to core/guards
2. Use Angular CLI to generate a functional guard
3. Implement the required logic for route protection
4. Register the guard in the appropriate route configuration

### Adding a New Interceptor

1. Navigate to core/interceptors
2. Use Angular CLI to generate an interceptor
3. Implement the intercept method with required logic
4. Register the interceptor in the app configuration using provideHttpClient with interceptors

### Adding a New Pipe or Directive

1. Navigate to the appropriate shared folder
2. Use Angular CLI to generate the pipe or directive as standalone
3. Ensure it is generic and well-documented
4. Export for use across features

---

## Naming Conventions

| Element           | Convention                        | Example                           |
| ----------------- | --------------------------------- | --------------------------------- |
| Components        | kebab-case                        | product-card, user-avatar         |
| Services          | camelCase with Service suffix     | authService, cartService          |
| Guards            | camelCase with Guard suffix       | authGuard, roleGuard              |
| Interceptors      | camelCase with Interceptor suffix | authInterceptor, errorInterceptor |
| Pipes             | camelCase with Pipe suffix        | currencyFormatPipe                |
| Directives        | camelCase with Directive suffix   | highlightDirective                |
| Models/Interfaces | PascalCase                        | Product, UserProfile, OrderItem   |
| Constants         | UPPER_SNAKE_CASE                  | API_BASE_URL, DEFAULT_PAGE_SIZE   |

---

## Import Order Guidelines

When importing in TypeScript files, follow this order:

1. Angular core and common imports
2. Third-party library imports
3. Core module imports
4. Shared module imports
5. Feature-specific imports
6. Relative imports

---

## Best Practices Checklist

- Always use standalone components for new development
- Implement lazy loading for all feature modules
- Keep components small and focused on a single responsibility
- Use OnPush change detection strategy where applicable
- Write unit tests alongside new components and services
- Follow the DRY principle; if code is duplicated, refactor to shared
- Use environment files for configuration values
- Document public APIs and complex logic with comments

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
