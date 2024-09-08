import { useCallback, useState } from "react";

type FormStateBase = Record<string, unknown>;

interface Validator<Value> {
  isValid: (value: Value) => boolean;
  errorMessage: string;
}

type ErrorState<FormState extends FormStateBase> = {
  [key in keyof FormState]?: string;
};

interface UseFormReturnType<FormState extends FormStateBase = FormStateBase> {
  formState: FormState;
  updateField: (field: keyof FormState, value: FormState[typeof field]) => void;
  onSubmitPressed: (
    onValidationSuccess: (formState: FormState) => void,
  ) => void;
  errorState: ErrorState<FormState>;
}

export interface FormDefinition<FormState extends FormStateBase> {
  initialState: FormState;
  validators: { [Field in keyof FormState]: Validator<FormState[Field]> };
}

export const useForm = <FormState extends FormStateBase>(
  definition: FormDefinition<FormState>,
): UseFormReturnType<FormState> => {
  const { initialState, validators } = definition;
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errorState, setErrorState] = useState<ErrorState<FormState>>({});
  const [hasAttemptedSubmission, setHasAttemptedSubmission] =
    useState<boolean>(false);

  const validateField = useCallback(
    (field: keyof FormState, value: FormState[typeof field]): boolean => {
      const validator = validators[field];
      const isValid = validator.isValid(value);

      setErrorState((currentErrorState) => ({
        ...currentErrorState,
        [field]: isValid ? undefined : validator.errorMessage,
      }));

      return isValid;
    },
    [validators],
  );

  const validateAllFields = useCallback((): boolean => {
    let areAllValid = true;
    for (const field in validators) {
      const fieldValue = formState[field];
      const isValid = validateField(field, fieldValue);

      if (!isValid) {
        areAllValid = false;
      }
    }

    return areAllValid;
  }, [formState, validateField, validators]);

  const updateField = useCallback(
    (field: keyof FormState, value: FormState[typeof field]): void => {
      setFormState((currentState) => ({ ...currentState, [field]: value }));

      if (hasAttemptedSubmission) {
        validateField(field, value);
      }
    },
    [hasAttemptedSubmission, validateField],
  );

  const onSubmitPressed = useCallback(
    (onValidationSuccess: (formState: FormState) => void) => {
      setHasAttemptedSubmission(true);

      const areAllValid = validateAllFields();

      if (areAllValid) {
        onValidationSuccess(formState);
      }
    },
    [formState, validateAllFields],
  );

  return {
    formState,
    updateField,
    onSubmitPressed,
    errorState,
  };
};
