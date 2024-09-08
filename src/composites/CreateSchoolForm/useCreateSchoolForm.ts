import type { FormDefinition } from "@/hooks/useForm";
import { useForm } from "@/hooks/useForm";

export type CreateSchoolFormValue = {
  name: string;
  description: string;
};

export const useCreateSchoolForm =
  (): FormDefinition<CreateSchoolFormValue> => {
    return useForm<CreateSchoolFormValue>(
      {
        name: "",
        description: "",
      },
      {
        name: {
          isValid: (value) => value.length > 0,
          errorMessage: "School name cannot be empty",
        },
        description: {
          isValid: (value) => value.length > 0,
          errorMessage: "School description cannot be empty",
        },
      },
    );
  };
