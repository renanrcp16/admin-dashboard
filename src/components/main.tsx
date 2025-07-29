import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Main({
  className,
  children,
  ...props
}: ComponentProps<"main">) {
  return (
    <main
      className={twMerge("w-full flex flex-col gap-3", className)}
      {...props}
    >
      {children}
    </main>
  );
}
