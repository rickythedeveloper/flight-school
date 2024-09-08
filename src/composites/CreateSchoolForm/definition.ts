import type { FormDefinition } from "@/hooks/useForm";

export type CreateSchoolFormValue = {
  name: string;
  description: string;
};

export const createSchoolFormDefinition: FormDefinition<CreateSchoolFormValue> =
  {
    initialState: {
      name: "",
      description: "",
    },
    validators: {
      name: {
        isValid: (value) => value.length > 0,
        errorMessage: "School name cannot be empty",
      },
      description: {
        isValid: (value) => value.length > 0,
        errorMessage: "School description cannot be empty",
      },
    },
  };
