# 🧩 Form Builder

A dynamic, schema-based form builder powered by Vue 3 + TypeScript. Designed for flexible UI generation, runtime validation, and powerful conditional logic support.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Friske2/FormBuilder.git
cd FormBuilder
npm install
```

Run the development server:

```bash
npm run dev
```

## Learn More

- Explore Vue 3's `<script setup>` syntax in the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).
- Check out the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup) for recommended project setup and IDE support.

Feel free to contribute or provide feedback to improve the form builder application!

### ✅ Basic Form Structure

### 📦 Features

- 🧱 **Supported Field Types**
  - `input`, `textarea`, `select`, `radio-group`, `checkbox-group`, `switch`, `date-picker`, `time-select`, etc.
- 📎 **Schema Definition**
  - Form built using a declarative JSON schema structure
- 🔒 **Validation**
  - Rule-based validation per field (required, min/max, type, trigger, etc.)
- 🧪 **Real-time Validation Integration**
  - Integrated with Element Plus form validation system
- 📌 **Column Layout Support**
  - Support for grid-like layout using `"is": "col"` with `span` per child

### ✅ Conditional Logic (showIf)

### 🧠 Features

- ✅ **Basic Condition**
  - `showIf: { field: 'region', operator: '==', value: 'shanghai' }`
- ✅ **Advanced Logic**
  - Nested AND/OR conditions
  - Example:
    ```json
    {
      "and": [
        { "field": "region", "operator": "==", "value": "shanghai" },
        {
          "or": [
            { "field": "type", "operator": "includes", "value": 1 },
            { "field": "resource", "operator": "==", "value": "Venue" }
          ]
        }
      ]
    }
    ```
- 🧼 **Auto-Clear Hidden Fields**
  - When a field becomes hidden (fails showIf), its value is automatically cleared
- 🧰 **Helper Function**
  - `getHiddenFields(formSchema, formValues)` returns all fields that should currently be hidden
- 🔗 **Child Field Visibility**
  - `showIf` applies to nested children (e.g., fields inside `"is": "col"`)

### 🛠 Tech Stack

- **Vue 3 + Vite**
- **TypeScript**
- **Element Plus**
- **DaisyUI** (for styling)
- Schema-driven architecture

### 📁 Example Schema

See [`/src/mock/exampleForm.json`](./src/mock/exampleForm.json) for a working schema example.
