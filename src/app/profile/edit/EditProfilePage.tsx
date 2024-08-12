"use client";

import type { ReactElement } from "react";
import { EditProfileForm } from "@/composites/EditProfileForm";
import { saveProfile } from "@/serverActions/profile/saveProfile";

export function EditProfilePage(): ReactElement {
  return <EditProfileForm saveProfile={saveProfile} />;
}
