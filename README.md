# InputField + DataTable Component Library

A React + TypeScript component library featuring:

- **InputField**: Label, helper text, error message, password toggle, clearable input.
- **Button**: Variants, sizes, loading state.
- **DataTable**: Sortable columns, selectable rows, loading & empty states.
- Fully responsive and accessible (ARIA labels, keyboard navigation).
- TailwindCSS for modern styling.

---

## Folder Structure

inputfield/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ InputField.tsx
│  │  ├─ Button.tsx
│  │  └─ DataTable.tsx
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ postcss.config.cjs
└─ tailwind.config.cjs



---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/inputfield.git
cd inputfield
npm install
npm run dev
npm run storybook

Approach

TypeScript

All components are fully typed for safety and flexibility.

Responsive Design

TailwindCSS utilities (w-full, max-w-md, sm:, md:) ensure components adapt to different screen sizes.

Accessibility

Proper <label> usage, ARIA labels for buttons, and keyboard navigation support for DataTable.

Styling

Modern, clean look with hover/focus states, rounded corners, spacing, and dark/light text support.

Components

InputField: Supports different variants (filled, outlined, ghost), sizes (sm, md, lg), loading, disabled, password toggle, and clearable input.

Button: Variants (primary, secondary, ghost), sizes, loading, disabled, accessible.

DataTable: Generic type-safe table, sortable columns, selectable rows, loading state, empty state.

Storybook Deployment

Chromatic:

npx chromatic --project-token <YOUR_PROJECT_TOKEN>


Vercel:

Connect your GitHub repository.

Set the build command to npm run storybook.

Set the output directory to storybook-static.
