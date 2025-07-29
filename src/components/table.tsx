import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";

function TableHeadColumn({
  className,
  children,
  ...props
}: ComponentProps<"th">) {
  return (
    <th className={twMerge("", className)} {...props}>
      {children}
    </th>
  );
}

function TableHeadRow({ className, children, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={twMerge("bg-gray-900 [&>th]:p-2 text-sm", className)}
      {...props}
    >
      {children}
    </tr>
  );
}

function TableHead({ className, children, ...props }: ComponentProps<"thead">) {
  return (
    <thead className={twMerge("", className)} {...props}>
      {children}
    </thead>
  );
}

function TableBody({ className, children, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody className={twMerge("", className)} {...props}>
      {children}
    </tbody>
  );
}

function TableBodyRow({ className, children, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={twMerge(
        "[&>td]:px-3 [&>td]:py-2 text-sm border-b-[1px] border-gray-700 last:border-none hover:bg-gray-700/20 transition-colors",
        className
      )}
    >
      {children}
    </tr>
  );
}

function TableBodyColumn({
  className,
  children,
  ...props
}: ComponentProps<"td">) {
  return (
    <td className={twMerge("", className)} {...props}>
      {children}
    </td>
  );
}

function TableBodyColumnAction({
  className,
  onClick,
  icon: Icon,
  ...props
}: ComponentProps<"button"> & { icon: ElementType }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "p-1.5 flex bg-gray-700/50 cursor-pointer text-gray-300 justify-center items-center rounded-lg hover:text-white hover:bg-gray-500/80 transition-colors outline-none focus-within:bg-gray-500/80 focus-within:text-white",
        className
      )}
      {...props}
    >
      <Icon size={16} />
    </button>
  );
}

export function Table({
  className,
  children,
  ...props
}: ComponentProps<"table">) {
  return (
    <table
      className={twMerge(
        "w-full rounded-lg overflow-hidden bg-gray-800/80",
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
}

TableHeadRow.Column = TableHeadColumn;
TableHead.Row = TableHeadRow;
TableBodyColumn.Action = TableBodyColumnAction;
TableBodyRow.Column = TableBodyColumn;
TableBody.Row = TableBodyRow;
Table.Body = TableBody;
Table.Head = TableHead;
