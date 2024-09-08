"use client";

import type { ReactElement } from "react";
import { useCallback } from "react";
import { Form } from "@/components/Form";
import type { CreateSchoolFormValue } from "@/composites/CreateSchoolForm/definition";
import { createSchoolFormDefinition } from "@/composites/CreateSchoolForm/definition";
import { TextField } from "@/components/inputs/textInputs/TextField";
import { useForm } from "@/hooks/useForm";
import { createSchoolAction } from "@/serverActions/school/createSchoolAction";

export const CreateSchoolForm = (): ReactElement => {
  const { formState, updateField, onSubmitPressed, errorState } = useForm(
    createSchoolFormDefinition,
  );

  const createSchool = useCallback((formValue: CreateSchoolFormValue) => {
    // TODO upload images
    void createSchoolAction(formValue);
    // TODO create school image entries
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
