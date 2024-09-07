import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/inputs/textInputs/TextField";
import { Button } from "@/components/Button";
import { Stack } from "@/components/layout/Stack";
import type { SaveProfileAction } from "@/serverActions/profile/saveProfileAction";
import { pathService } from "@/services/pathService/injection";

interface EditProfileFormProps {
  saveProfile: SaveProfileAction;
}

export function EditProfileForm({
  saveProfile,
}: EditProfileFormProps): ReactElement {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [hasAttemptedSaving, setHasAttemptedSaving] = useState<boolean>(false);

  const shouldDisableSaveButton = !firstName || !lastName;

  const saveProfileWithCurrentData = useCallback(async () => {
    setHasAttemptedSaving(true);

    if (firstName && lastName) {
      const result = await saveProfile({ firstName, lastName });
      if (result.isSuccess) {
        router.push(pathService.profile.url);
      }
    }
  }, [firstName, lastName, router, saveProfile]);

  return (
    <Stack align={"center"}>
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
    </Stack>
  );
}
