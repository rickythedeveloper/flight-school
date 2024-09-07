"use client";

import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";

export default function Page(): ReactElement {
  const router = useRouter();

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        router.back();
      }}
      title={"Create new school"}
    >
      helloooo
    </Modal>
  );
}
