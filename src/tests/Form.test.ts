import { describe, it, expect } from "vitest";
import { initStructure, evaluateShowIf, getHiddenFields } from "../components/Form";
import type { Schema } from "../types/Schema";

// ── shared helpers ──────────────────────────────────────────────────────────

function makeField(overrides: Partial<Schema[number]> = {}): Schema[number] {
  return {
    code: "field1",
    defaultValue: null,
    is: "input",
    label: { text: "Label", position: "left" },
    props: { placeholder: "Enter value" },
    rules: [{ required: false, message: "This field is required", trigger: "change" }],
    ...overrides,
  };
}

// ── initStructure ───────────────────────────────────────────────────────────

describe("initStructure", () => {
  it("sets null when defaultValue is null (null !== undefined so it is included)", () => {
    const schema: Schema = [makeField({ code: "name", defaultValue: null })];
    expect(initStructure(schema)).toEqual({ name: null });
  });

  it("uses defaultValue string when provided", () => {
    const schema: Schema = [makeField({ code: "name", defaultValue: "John" })];
    expect(initStructure(schema)).toEqual({ name: "John" });
  });

  it("uses defaultValue array for checkbox-group", () => {
    const schema: Schema = [
      makeField({ code: "type", is: "checkbox-group", defaultValue: [] }),
    ];
    expect(initStructure(schema)).toEqual({ type: [] });
  });

  it("uses defaultValue boolean for switch/checkbox", () => {
    const schema: Schema = [
      makeField({ code: "isActive", is: "switch", defaultValue: false }),
    ];
    expect(initStructure(schema)).toEqual({ isActive: false });
  });

  it("flattens col children into the form", () => {
    const schema: Schema = [
      makeField({
        code: "date1",
        is: "col",
        props: { style: { display: "flex", width: "100%" } },
        children: [
          {
            code: "date1",
            defaultValue: "",
            is: "date-picker",
            span: 6,
            props: { type: "date", placeholder: "Pick a date" },
            rules: [{ required: false, message: "Please pick a date", trigger: "change" }],
          },
          {
            code: "time1",
            defaultValue: null,
            is: "time-select",
            span: 6,
            props: { placeholder: "Pick a time", start: "00:00", end: "23:59", step: "00:30" },
            rules: [{ required: false, message: "Please pick a time", trigger: "change" }],
          },
        ],
      }),
    ];
    expect(initStructure(schema)).toMatchObject({ date1: "", time1: null });
  });
});

// ── evaluateShowIf ──────────────────────────────────────────────────────────

describe("evaluateShowIf", () => {
  const form = {
    resource: "Sponsorship",
    region: "shanghai",
    type: [1, 3],
    score: 10,
  };

  it("== operator — match", () => {
    expect(evaluateShowIf({ field: "resource", operator: "==", value: "Sponsorship" }, form)).toBe(true);
  });

  it("== operator — no match", () => {
    expect(evaluateShowIf({ field: "resource", operator: "==", value: "Venue" }, form)).toBe(false);
  });

  it("!= operator", () => {
    expect(evaluateShowIf({ field: "resource", operator: "!=", value: "Venue" }, form)).toBe(true);
  });

  it("> operator", () => {
    expect(evaluateShowIf({ field: "score", operator: ">", value: 5 }, form)).toBe(true);
    expect(evaluateShowIf({ field: "score", operator: ">", value: 20 }, form)).toBe(false);
  });

  it("< operator", () => {
    expect(evaluateShowIf({ field: "score", operator: "<", value: 20 }, form)).toBe(true);
    expect(evaluateShowIf({ field: "score", operator: "<", value: 5 }, form)).toBe(false);
  });

  it("includes operator on array", () => {
    expect(evaluateShowIf({ field: "type", operator: "includes", value: 1 }, form)).toBe(true);
    expect(evaluateShowIf({ field: "type", operator: "includes", value: 2 }, form)).toBe(false);
  });

  it("!includes operator on array", () => {
    expect(evaluateShowIf({ field: "type", operator: "!includes", value: 2 }, form)).toBe(true);
    expect(evaluateShowIf({ field: "type", operator: "!includes", value: 1 }, form)).toBe(false);
  });

  it("and group — all conditions must pass (mirrors desc showIf in exampleForm)", () => {
    // desc field showIf: region == shanghai AND (type includes 1 OR resource == Venue)
    const expr = {
      and: [
        { field: "region", operator: "==" as const, value: "shanghai" },
        {
          or: [
            { field: "type", operator: "includes" as const, value: 1 },
            { field: "resource", operator: "==" as const, value: "Venue" },
          ],
        },
      ],
    };
    expect(evaluateShowIf(expr, form)).toBe(true);
    expect(evaluateShowIf(expr, { ...form, region: "beijing" })).toBe(false);
  });

  it("or group — at least one must pass", () => {
    const expr = {
      or: [
        { field: "resource", operator: "==" as const, value: "Venue" },
        { field: "type", operator: "includes" as const, value: 1 },
      ],
    };
    // resource != Venue but type includes 1 → true
    expect(evaluateShowIf(expr, form)).toBe(true);
    // neither passes
    expect(evaluateShowIf(expr, { ...form, resource: "Venue" })).toBe(true);
    expect(evaluateShowIf(expr, { ...form, resource: "Other", type: [] })).toBe(false);
  });
});

// ── getHiddenFields ─────────────────────────────────────────────────────────

describe("getHiddenFields", () => {
  it("returns field code when showIf evaluates to false", () => {
    const schema = [{
      code: "date1",
      is: "col",
      showIf: { field: "resource", operator: "==" as const, value: "Sponsorship" },
    }];
    // resource != Sponsorship → hidden
    expect(getHiddenFields(schema, { resource: "Venue" })).toContain("date1");
  });

  it("returns empty array when field is visible", () => {
    const schema = [{
      code: "date1",
      is: "col",
      showIf: { field: "resource", operator: "==" as const, value: "Sponsorship" },
    }];
    expect(getHiddenFields(schema, { resource: "Sponsorship" })).toHaveLength(0);
  });

  it("includes all child codes when parent col is hidden", () => {
    const schema = [{
      code: "date1",
      is: "col",
      showIf: { field: "resource", operator: "==" as const, value: "Sponsorship" },
      children: [
        { code: "date1", is: "date-picker" },
        { code: "time1", is: "time-select" },
      ],
    }];
    const hidden = getHiddenFields(schema, { resource: "Venue" });
    expect(hidden).toContain("date1");
    expect(hidden).toContain("time1");
  });

  it("returns no hidden fields when showIf is absent", () => {
    const schema = [{ code: "name", is: "input" }];
    expect(getHiddenFields(schema, {})).toHaveLength(0);
  });
});
