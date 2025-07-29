import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function FormErrorMessage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span className={twMerge("text-red-500 text-sm", className)} {...props} />
  );
}

function FormColumnLabel({ className, ...props }: ComponentProps<"label">) {
  return <label className={twMerge("text-sm", className)} {...props} />;
}

function FormColumn({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("flex-1 flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function FormRow({ className, ...props }: ComponentProps<"div">) {
  return <div className={twMerge("flex gap-2", className)} {...props} />;
}

export function Form({ className, ...props }: ComponentProps<"form">) {
  return (
    <form className={twMerge("flex flex-col gap-3", className)} {...props} />
  );
}

FormColumn.Label = FormColumnLabel;
FormRow.Column = FormColumn;
Form.ErrorMessage = FormErrorMessage;
Form.Row = FormRow;
