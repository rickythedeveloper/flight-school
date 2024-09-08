/**
 * @jest-environment jsdom
 */

import { describe, expect, jest, test } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { FormDefinition } from "@/hooks/useForm";
import { useForm } from "@/hooks/useForm";

const sampleFormDefinition: FormDefinition<{ field: string }> = {
  initialState: { field: "" },
  validators: {
    field: {
      isValid: (value) => value.length > 0,
      errorMessage: "Field cannot be empty",
    },
  },
};

describe("useForm", () => {
  test("should have no errors until submit is pressed", () => {
    const { result } = renderHook(() => useForm(sampleFormDefinition));

    expect(result.current.errorState).toStrictEqual({});

    act(() => {
      result.current.updateField("field", "a");
    });
    expect(result.current.errorState).toStrictEqual({});

    act(() => {
      result.current.updateField("field", "");
    });
    expect(result.current.errorState).toStrictEqual({});

    act(() => {
      result.current.onSubmitPressed(() => {});
    });
    expect(result.current.errorState).toStrictEqual({
      field: "Field cannot be empty",
    });
  });

  test("should update form state after updating a field", () => {
    const { result } = renderHook(() => useForm(sampleFormDefinition));

    act(() => {
      result.current.updateField("field", "some value");
    });
    expect(result.current.formState).toStrictEqual({ field: "some value" });
  });

  test("should only invoke callback when validation succeeds on submit", () => {
    const { result } = renderHook(() => useForm(sampleFormDefinition));

    const callback = jest.fn();

    act(() => {
      result.current.onSubmitPressed(callback);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      result.current.updateField("field", "some value");
    });

    act(() => {
      result.current.onSubmitPressed(callback);
    });
    expect(callback).toHaveBeenCalledWith({ field: "some value" });
  });
});
