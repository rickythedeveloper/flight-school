import type { ReactElement } from "react";
import { redirect } from "next/navigation";
import { getProfileAction } from "@/serverActions/profile/getProfileAction";
import { pathService } from "@/services/pathService/injection";
import { ProfilePage } from "@/app/profile/ProfilePage";

export default async function Page(): Promise<ReactElement> {
  const getProfileResult = await getProfileAction();

  if (getProfileResult.isSuccess) {
    const profile = getProfileResult.data;
    return <ProfilePage profile={profile} />;
  }

  switch (getProfileResult.error) {
    case "notAuthenticated":
      return redirect(pathService.login.url);
    case "profileNotFound":
      return redirect(pathService.profile.edit.url);
  }
}
