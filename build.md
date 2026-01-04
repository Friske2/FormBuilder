# @friske2/form-builder - Build & Installation Guide

## 📦 Build Library

### Prerequisites

```bash
npm install
```

### Build Commands

```bash
# Build library สำหรับ production
npm run build:lib

# Output files จะอยู่ใน dist/
# - dist/form-builder.es.js    (ESM)
# - dist/form-builder.umd.js   (UMD)
# - dist/form-builder.css      (Styles: Element Plus + DaisyUI + Custom)
# - dist/types/                (TypeScript declarations)
```

### Create Package (.tgz)

```bash
# สร้างไฟล์ .tgz สำหรับ install locally
npm pack

# Output: friske2-form-builder-{version}.tgz
```

---

## 🚀 Installation

### วิธีที่ 1: Install จาก .tgz (Local Testing)

```bash
# ที่ project อื่น
npm install /path/to/friske2-form-builder-1.0.1.tgz
```

### วิธีที่ 2: Install จาก path โดยตรง

```bash
npm install /path/to/FormBuilder
```

### วิธีที่ 3: Install จาก npm (หลัง publish)

```bash
npm install @friske2/form-builder
```

---

## 💻 Usage

### Basic Import

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { FormBuilder } from "@friske2/form-builder";
import "@friske2/form-builder/style.css";

const app = createApp(App);
app.mount("#app");
```

### Use as Vue Plugin (Register ทุก components อัตโนมัติ)

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import FormBuilderPlugin from "@friske2/form-builder";
import "@friske2/form-builder/style.css";

const app = createApp(App);
app.use(FormBuilderPlugin);
app.mount("#app");
```

### Import Components

```typescript
import {
  FormBuilder,
  FieldInput,
  FieldSelect,
  FieldCheckbox,
  FieldRadioGroup,
  FieldDatePicker,
  FieldSwitch,
} from "@friske2/form-builder";
```

### Import Types

```typescript
import type {
  Schema,
  FormField,
  FormConfig,
  FormType,
  Rule,
  Option,
} from "@friske2/form-builder";
```

### Import Utilities & Hooks

```typescript
import {
  // Hooks
  useFieldInput,
  useValidator,
  // Utilities
  initStructure,
  getHiddenFields,
  evaluateShowIf,
  validateEmail,
} from "@friske2/form-builder";
```

---

## 📤 Publish to npm

### 1. Update Version

```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

### 2. Login to npm

```bash
npm login
```

### 3. Publish

```bash
# Dry run (ทดสอบก่อน ไม่ publish จริง)
npm publish --dry-run

# Publish จริง (scoped package ต้องใช้ --access public)
npm publish --access public
```

---

## 📁 Project Structure

```
dist/
├── form-builder.es.js      # ESM module
├── form-builder.umd.js     # UMD module
├── form-builder.css        # All styles bundled
└── types/
    └── index.d.ts          # TypeScript declarations
```

---

## ⚠️ Notes

- **Vue 3** เป็น peer dependency - project ที่ใช้ต้อง install Vue 3 เอง
- **Element Plus** และ **DaisyUI** styles ถูก bundle รวมมาแล้วใน `style.css`
- ต้อง import `@friske2/form-builder/style.css` เพื่อให้ styles ทำงาน
