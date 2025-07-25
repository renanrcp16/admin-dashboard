import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      type="text"
      className={twMerge(
        "bg-gray-700/50 p-1.5 rounded text-white text-sm outline-none focus-within:bg-gray-700/70 transition-colors w-full disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
