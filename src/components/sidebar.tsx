import Link from "next/link";
import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";
import { Wrapper } from "./wrapper";

function SidebarItem({
  className,
  href,
  children,
  icon: Icon,
  ...props
}: ComponentProps<"a"> & { href: string; icon?: ElementType }) {
  return (
    <li>
      <Link
        className={twMerge(
          "p-2 rounded-lg hover:bg-gray-700/80 w-40 flex items-center gap-2 transition-colors text-[.9rem] outline-none focus-within:bg-gray-700/80",
          className
        )}
        href={href}
        {...props}
      >
        {Icon && <Icon size={19} />}
        {children}
      </Link>
    </li>
  );
}

function SidebarList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul className={twMerge("flex flex-col gap-1", className)} {...props} />
  );
}

export function Sidebar({ className, ...props }: ComponentProps<"div">) {
  return (
    <aside className="select-none">
      <Wrapper {...props} className={twMerge("h-full", className)} />
    </aside>
  );
}

SidebarList.Item = SidebarItem;
Sidebar.List = SidebarList;
