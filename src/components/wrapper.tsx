import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Wrapper({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "bg-gray-800/70 p-3 rounded-lg flex flex-col shadow-md",
        className
      )}
      {...props}
    />
  );
}
