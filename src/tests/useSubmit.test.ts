import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref } from "vue";
import useSubmit from "../components/hooks/useSubmit";

// ── mock advanceValidator ────────────────────────────────────────────────────

vi.mock("../utils/advanceValidator", () => ({
  advanceValidator: vi.fn(),
}));

import { advanceValidator } from "../utils/advanceValidator";
const mockAdvanceValidator = vi.mocked(advanceValidator);

// suppress console noise from useSubmit internals during all tests
beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

// ── helpers ──────────────────────────────────────────────────────────────────

function makeElForm(valid = true) {
  return ref({
    validate: vi.fn((cb: (v: boolean) => void) => cb(valid)),
    clearValidate: vi.fn(),
  });
}

const baseFields = [
  { code: "name", is: "input" },
  { code: "email", is: "email" },
];

// ── submit ───────────────────────────────────────────────────────────────────

describe("useSubmit — submit()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error when warpElForm ref is null", async () => {
    const { submit } = useSubmit(ref(null), baseFields, {}, {});
    const result = await submit();
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessages).toBe("Form reference not found");
  });

  it("returns error when el-form validation fails", async () => {
    const elForm = makeElForm(false); // validate returns false
    const { submit } = useSubmit(elForm, baseFields, { name: "" }, { name: "" });
    const result = await submit();
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessages).toBe("Form validation failed");
  });

  it("returns success with form snapshot when all validations pass", async () => {
    const elForm = makeElForm(true);
    const form = { name: "John", email: "john@example.com" };
    const { submit } = useSubmit(elForm, baseFields, form, { name: "", email: "" });
    const result = await submit();
    expect(result.isSuccess).toBe(true);
    expect(result.errorMessages).toBeNull();
    expect(result.result).toEqual({ name: "John", email: "john@example.com" });
  });

  it("result is a snapshot — mutating form after submit does not affect result", async () => {
    const elForm = makeElForm(true);
    const form = { name: "John", email: "john@example.com" };
    const { submit } = useSubmit(elForm, baseFields, form, {});
    const result = await submit();
    form.name = "Changed";
    expect(result.result.name).toBe("John");
  });

  it("clears hidden fields from form after successful submit", async () => {
    const elForm = makeElForm(true);
    // extra has showIf resource == "Sponsorship" but form has resource = "Venue" → hidden
    const fields = [
      { code: "resource", is: "input" },
      { code: "extra", is: "input", showIf: { field: "resource", operator: "==", value: "Sponsorship" } },
    ];
    const form = { resource: "Venue", extra: "should be cleared" };
    const { submit } = useSubmit(elForm, fields, form, {});
    const result = await submit();
    expect(result.isSuccess).toBe(true);
    expect(form.extra).toBeNull();
  });

  it("does not clear hidden field when its value is already falsy", async () => {
    const elForm = makeElForm(true);
    const fields = [
      { code: "resource", is: "input" },
      { code: "extra", is: "input", showIf: { field: "resource", operator: "==", value: "Sponsorship" } },
    ];
    const form = { resource: "Venue", extra: null };
    const { submit } = useSubmit(elForm, fields, form, {});
    await submit();
    expect(form.extra).toBeNull(); // unchanged
  });

  it("returns error when advanced (JSONata) validation fails", async () => {
    mockAdvanceValidator.mockResolvedValue(false);
    const elForm = makeElForm(true);
    const form = { amount: 50 };
    const advancedValidations = [{
      fields: ["amount"],
      validator: "jsonata",
      expression: "amount > 100",
      message: "Amount must be greater than 100",
    }];
    const { submit } = useSubmit(elForm, baseFields, form, {}, advancedValidations);
    const result = await submit();
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessages).toBe("Amount must be greater than 100");
  });

  it("passes when advanced (JSONata) validation succeeds", async () => {
    mockAdvanceValidator.mockResolvedValue(true);
    const elForm = makeElForm(true);
    const form = { amount: 200 };
    const advancedValidations = [{
      fields: ["amount"],
      validator: "jsonata",
      expression: "amount > 100",
      message: "Amount must be greater than 100",
    }];
    const { submit } = useSubmit(elForm, baseFields, form, {}, advancedValidations);
    const result = await submit();
    expect(result.isSuccess).toBe(true);
  });

  it("skips advanced validation entry when validator is not jsonata", async () => {
    const elForm = makeElForm(true);
    const form = { name: "John" };
    const advancedValidations = [{
      fields: ["name"],
      validator: "someOtherValidator", // not jsonata → skipped
      expression: "name",
      message: "Should not appear",
    }];
    const { submit } = useSubmit(elForm, baseFields, form, {}, advancedValidations);
    const result = await submit();
    expect(result.isSuccess).toBe(true);
    expect(mockAdvanceValidator).not.toHaveBeenCalled();
  });

  it("catches unexpected error and returns error result", async () => {
    const elForm = ref({
      validate: vi.fn(() => { throw new Error("Unexpected crash"); }),
      clearValidate: vi.fn(),
    });
    const { submit } = useSubmit(elForm, baseFields, {}, {});
    const result = await submit();
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessages).toBe("Unexpected crash");
  });
});

// ── reset ─────────────────────────────────────────────────────────────────────

describe("useSubmit — reset()", () => {
  it("restores form values to initialFormState", async () => {
    const elForm = makeElForm();
    const form = { name: "Changed", email: "changed@example.com" };
    const initial = { name: "John", email: "john@example.com" };
    const { reset } = useSubmit(elForm, baseFields, form, initial);
    await reset();
    expect(form.name).toBe("John");
    expect(form.email).toBe("john@example.com");
  });

  it("sets null for keys not present in initialFormState", async () => {
    const elForm = makeElForm();
    const form = { name: "John", extra: "bonus" };
    const initial = { name: "John" }; // extra ไม่อยู่ใน initial
    const { reset } = useSubmit(elForm, baseFields, form, initial);
    await reset();
    expect(form.extra).toBeNull();
  });

  it("calls clearValidate after reset", async () => {
    const elForm = makeElForm();
    const form = { name: "Changed" };
    const initial = { name: "" };
    const { reset } = useSubmit(elForm, baseFields, form, initial);
    await reset();
    expect(elForm.value.clearValidate).toHaveBeenCalledOnce();
  });
});
