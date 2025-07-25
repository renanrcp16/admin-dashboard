import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Button({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={twMerge(
        "p-1.5 min-w-20 text-sm flex justify-center items-center gap-2 outline-none bg-teal-600 rounded-md cursor-pointer hover:brightness-95 active:brightness-90 transition-all disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
