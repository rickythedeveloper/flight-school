import type { ReactElement } from "react";
import Link from "next/link";
import { pathService } from "@/services/pathService/injection";

export default function Page(): ReactElement {
  return (
    <>
      school page
      <Link href={pathService.school.new.url}>create</Link>
    </>
  );
}
