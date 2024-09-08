"use client";

import type { ReactElement } from "react";
import { useCallback } from "react";
import { Form } from "@/components/Form";
import type { CreateSchoolFormValue } from "@/composites/CreateSchoolForm/useCreateSchoolForm";
import { useCreateSchoolForm } from "@/composites/CreateSchoolForm/useCreateSchoolForm";
import { TextField } from "@/components/inputs/textInputs/TextField";

export const CreateSchoolForm = (): ReactElement => {
  const { formState, updateField, onSubmitPressed, errorState } =
    useCreateSchoolForm();

  const createSchool = useCallback((formValue: CreateSchoolFormValue) => {
    // TODO
    console.log(formValue);
  }, []);

  return (
    <Form
      submitButtonTitle={"Create"}
      onSubmitPressed={() => onSubmitPressed(createSchool)}
    >
      <TextField
        label={"Name"}
        placeholder={"Enter school name"}
        value={formState.name}
        setValue={(newValue) => updateField("name", newValue)}
        error={errorState.name}
        required
      />
      <TextField
        label={"Description"}
        placeholder={"Enter school description"}
        value={formState.description}
        setValue={(newValue) => updateField("description", newValue)}
        error={errorState.description}
        required
      />
    </Form>
  );
};
