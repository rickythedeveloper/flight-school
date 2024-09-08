import type { ReactElement, ReactNode } from "react";
import { FormButton } from "@/components/Form/FormButton";
import type { FormDefinition, FormStateBase } from "@/hooks/useForm";

interface FormProp<FormValue extends FormStateBase> {
  children: ReactNode;
  form: FormDefinition<FormValue>;
  submitButtonTitle: string;
  onSubmit: (formValue: FormValue) => void;
}

export const Form = <FormValue extends FormStateBase>({
  children,
  form,
  submitButtonTitle,
  onSubmit,
}: FormProp<FormValue>): ReactElement => {
  return (
    <form onSubmit={() => form.onSubmitPressed(onSubmit)}>
      {children}
      <FormButton title={submitButtonTitle} disabled={false} />
    </form>
  );
};
