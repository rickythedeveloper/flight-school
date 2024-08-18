import type { ReactElement } from "react";
import { redirect } from "next/navigation";
import { getProfileAction } from "@/serverActions/profile/getProfileAction";
import { pathService } from "@/services/pathService/injection";

export default async function Account(): Promise<ReactElement> {
  const getProfileResult = await getProfileAction();

  if (getProfileResult.isSuccess) {
    const profile = getProfileResult.data;
    return (
      <div>
        {profile.firstName} {profile.lastName}
      </div>
    );
  }

  switch (getProfileResult.error) {
    case "notAuthenticated":
      return redirect(pathService.login.url);
    case "profileNotFound":
      return redirect(pathService.profile.edit.url);
  }
}
