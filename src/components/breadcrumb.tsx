import { ComponentProps } from "react";
import { Wrapper } from "./wrapper";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function BreadcrumbSeparator() {
  return (
    <li>
      <ChevronRight size={18} className="text-gray-500" />
    </li>
  );
}

function BreadcrumbItem({
  className,
  href,
  disabled,
  ...props
}: ComponentProps<"a"> & { href?: string; disabled?: boolean }) {
  return (
    <li>
      <Link
        href={href ?? "/"}
        aria-disabled={disabled || !href}
        className={twMerge(
          "p-1.5 hover:bg-gray-700 transition-colors rounded-lg inline-block aria-disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    </li>
  );
}

export function Breadcrumb({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <nav>
      <Wrapper className={twMerge("p-2", className)} {...props}>
        <ul className="flex items-center gap-1 text-sm text-gray-200 select-none">
          {children}
        </ul>
      </Wrapper>
    </nav>
  );
}

Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Item = BreadcrumbItem;
