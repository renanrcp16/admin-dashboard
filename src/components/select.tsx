import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function SelectOption({ className, ...props }: ComponentProps<"option">) {
  return <option className={twMerge("", className)} {...props} />;
}

export function Select({
  children,
  className,
  ...props
}: ComponentProps<"select">) {
  return (
    <select
      className={twMerge(
        "bg-gray-700/50 focus-within:bg-gray-700 h-8 p-1.5 rounded text-white text-sm outline-none  transition-colors w-full disabled:opacity-60 border-r-4 border-transparent",
        className
      )}
      {...props}
    >
      <SelectOption value="" hidden disabled>
        Select...
      </SelectOption>
      {children}
    </select>
  );
}

Select.Option = SelectOption;
