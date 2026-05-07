# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@friske2/form-builder` — a Vue 3 schema-driven form builder library published to npm. It generates dynamic forms from JSON schema definitions with built-in conditional logic and Element Plus validation.

## Commands

```bash
npm run dev          # Start dev server (port 8080) with demo app
npm run build        # Build demo app (vue-tsc + vite)
npm run build:lib    # Build library for npm publish (ESM + UMD + type defs)
npm run preview      # Preview production build
```

No test runner is configured. Type correctness is validated via `vue-tsc -b` during build. Manual testing is done through the demo app (`src/App.vue`) using the mock schemas in `src/mocks/`.

## Architecture

### Schema → Form Pipeline

The library is purely schema-driven. A `Schema` (array of `FormField`) is passed to `<FormBuilder>`, which walks the array and renders each field through this component chain:

```
FormBuilder.vue
  └── ShowIfWrapper.vue     ← evaluates showIf conditions, hides/clears field
        └── FieldItem.vue   ← maps field.is (string) → concrete field component
              ├── FieldInput, FieldSelect, FieldCheckboxGroup, etc.
              └── FieldDiv / FieldCol  ← recursive containers for grid layout
```

`Form.ts` contains the core utilities: `initStructure()` (initialize form values from schema), `getHiddenFields()` (recursive, handles nested col children), and `evaluateShowIf()` (interprets the condition tree).

### Conditional Logic (`showIf`)

Conditions are evaluated in `ShowIfWrapper.vue` using `evaluateShowIf()` from `Form.ts`. Supported operators: `==`, `!=`, `>`, `<`, `>=`, `<=`, `includes`, `!includes`. Conditions compose with `and`/`or` groups that can nest arbitrarily. When a field becomes hidden, its value is automatically cleared.

### Validation

Validation is delegated to Element Plus' form validation system (`el-form`). Rule strings like `"validateEmailWithForm"` are resolved to actual validator functions by `useValidator.ts`, which looks them up from `utils/valitator.ts`.

### Field Addition Pattern

To add a new field type:
1. Create `src/components/fields/FieldFoo.vue`
2. Add the mapping in `FieldItem.vue`'s component lookup
3. Export from `src/index.ts`
4. Add any needed prop types to `src/types/FieldProps.ts`

### Build Outputs

`vite.lib.config.ts` produces `dist/form-builder.es.js`, `dist/form-builder.umd.js`, `dist/form-builder.css`, and `dist/types/` (TypeScript declarations via `vite-plugin-dts`). The app build (`vite.config.ts`) is for the demo only.

## SonarQube MCP (when available)

- Before modifying code: call `toggle_automatic_analysis` to disable auto-analysis
- After finishing all file changes: call `analyze_file_list` on modified files
- After analysis: re-enable with `toggle_automatic_analysis`
- Look up project keys via `search_my_sonarqube_projects` — never guess them
- SonarQube requires USER tokens (not project tokens)
