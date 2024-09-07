import type { ReactElement } from "react";
import Link from "next/link";

export default function Page(): ReactElement {
  return (
    <>
      school page
      <Link href={"/school/new"}>create</Link>
    </>
  );
}
