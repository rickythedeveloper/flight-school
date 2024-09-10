import type { ReactElement, ReactNode } from "react";
import { FormButton } from "@/components/Form/FormButton";
import { Stack } from "@/components/layout/Stack";

interface FormProp {
  children: ReactNode;
  submitButtonTitle: string;
  onSubmitPressed: () => void;
  submitButtonIsDisabled: boolean;
}

export const Form = ({
  children,
  submitButtonTitle,
  onSubmitPressed,
  submitButtonIsDisabled,
}: FormProp): ReactElement => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitPressed();
      }}
    >
      <Stack>
        {children}
        <FormButton
          title={submitButtonTitle}
          disabled={submitButtonIsDisabled}
        />
      </Stack>
    </form>
  );
};
