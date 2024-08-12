import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { TextField } from "@/components/inputs/textInputs/TextField";
import { Button } from "@/components/buttons/Button";

interface EditProfileFormProps {
  saveProfile: (profile: { firstName: string; lastName: string }) => void;
}

export function EditProfileForm({
  saveProfile,
}: EditProfileFormProps): ReactElement {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [hasAttemptedSaving, setHasAttemptedSaving] = useState<boolean>(false);

  const shouldDisableSaveButton = !firstName || !lastName;

  const saveProfileWithCurrentData = useCallback(async () => {
    setHasAttemptedSaving(true);

    if (firstName && lastName) {
      saveProfile({ firstName, lastName });
    }
  }, [firstName, lastName, saveProfile]);

  return (
    <>
      <TextField
        label={"First Name"}
        value={firstName}
        setValue={setFirstName}
        required
        error={
          hasAttemptedSaving && !firstName
            ? "First name cannot be empty"
            : false
        }
      />
      <TextField
        label={"Last Name"}
        value={lastName}
        setValue={setLastName}
        required
        error={
          hasAttemptedSaving && !lastName ? "Last name cannot be empty" : false
        }
      />
      <Button
        title={"Save"}
        onClick={saveProfileWithCurrentData}
        disabled={shouldDisableSaveButton}
      />
    </>
  );
}
