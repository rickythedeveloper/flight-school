"use client";

import type { ReactElement } from "react";
import { useCallback } from "react";
import { Form } from "@/components/Form";
import type { CreateSchoolFormValue } from "@/forms/useCreateSchoolForm";
import { useCreateSchoolForm } from "@/forms/useCreateSchoolForm";
import { TextField } from "@/components/inputs/textInputs/TextField";

export const CreateSchoolForm = (): ReactElement => {
  const createSchoolForm = useCreateSchoolForm();
  const { formState, updateField } = createSchoolForm;

  const createSchool = useCallback((formValue: CreateSchoolFormValue) => {
    // TODO
    console.log(formValue);
  }, []);

  return (
    <Form
      formDefinition={createSchoolForm}
      submitButtonTitle={"Create"}
      submit={createSchool}
    >
      <TextField
        label={"Name"}
        value={formState.name}
        setValue={(newValue) => updateField("name", newValue)}
      />
      <TextField
        label={"Description"}
        value={formState.description}
        setValue={(newValue) => updateField("description", newValue)}
      />
    </Form>
  );
};
