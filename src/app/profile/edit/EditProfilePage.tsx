"use client";

import type { ReactElement } from "react";
import { EditProfileForm } from "@/composites/EditProfileForm";
import { saveProfileAction } from "@/serverActions/profile/saveProfileAction";

export function EditProfilePage(): ReactElement {
  return <EditProfileForm saveProfile={saveProfileAction} />;
}
