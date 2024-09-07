"use client";

import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { pathService } from "@/services/pathService/injection";
import type { Profile } from "@/services/dbService/dbService";

interface ProfilePageProps {
  profile: Profile;
}

export function ProfilePage({ profile }: ProfilePageProps): ReactElement {
  const router = useRouter();

  return (
    <>
      <div>
        {profile.firstName} {profile.lastName}
      </div>
      <Button
        title={"Edit"}
        onClick={() => {
          router.push(pathService.profile.edit.url);
        }}
      />
    </>
  );
}
