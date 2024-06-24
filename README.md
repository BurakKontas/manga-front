# React Template

Explore a robust React template empowered with Typescript, Vite for rapid development, Redux for state management, Redux-Persist for persistent state storage, integrated path aliases for enhanced module imports, and a meticulously organized folder structure optimized for components and Redux slices.

## How to start

To start the React template, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running the command:
 ```bash
 npm install
 ```

## Start development

To start development, run the following command:
```bash
npm start
```

## Folder Structure
```plaintext
────src
    ├───components
    │   └───custombutton
    │           custombutton.module.scss
    │           custombutton.tsx
    │           custombutton.types.ts
    │           index.ts
    ├───pages
    │   └───homepage
    │           Homepage.module.scss
    │           Homepage.tsx
    │           index.ts
    │
    ├───redux
    │   └───Counter
    │           counter.async_thunks.ts
    │           counter.extra_reducers.ts
    │           counter.reducers.ts
    │           counter.selectors.ts
    │           counter.slice.ts
    │           counter.types.ts
    │           index.ts
    │   │
    │   hooks.ts
    │   persist.config.ts
    │   store.ts
    │
    router.tsx
    providers.tsx
    main.tsx
```
