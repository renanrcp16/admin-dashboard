"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const headersList = await headers();
  const { pathname } = new URL(headersList.get("x-url") as string);

  redirect(`/not-found?p=${encodeURIComponent(pathname)}`);
}
