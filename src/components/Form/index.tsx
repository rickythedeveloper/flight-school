import type { ReactElement, ReactNode } from "react";
import { FormButton } from "@/components/Form/FormButton";
import type { FormDefinition, FormStateBase } from "@/hooks/useForm";

interface FormProp<FormValue extends FormStateBase> {
  children: ReactNode;
  formDefinition: FormDefinition<FormValue>;
  submitButtonTitle: string;
  submit: (formValue: FormValue) => void;
}

export const Form = <FormValue extends FormStateBase>({
  children,
  formDefinition,
  submitButtonTitle,
  submit,
}: FormProp<FormValue>): ReactElement => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        formDefinition.onSubmitPressed(submit);
      }}
    >
      {children}
      <FormButton title={submitButtonTitle} disabled={false} />
    </form>
  );
};
