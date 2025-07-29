import Link from "next/link";
import { ComponentProps } from "react";
import { Button } from "./button";

export function LinkButton({
  href,
  ...props
}: ComponentProps<"button"> & { href: string }) {
  return (
    <Link href={href} tabIndex={-1}>
      <Button {...props} />
    </Link>
  );
}
