import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { Wrapper } from "@/components/wrapper";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const url = new URL(headersList.get("x-url") as string);
  const pathname = url.searchParams.get("p") as string;

  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Not found</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper className="justify-center">
        <div className="flex flex-col items-center gap-1">
          <h3 className="font-bold text-9xl text-gray-500/40">404</h3>
          <h4 className="text-xl text-gray-300">Not Found</h4>
          <p className="p-2 text-sm bg-gray-700 rounded-lg w-72 text-center truncate overflow-hidden">
            {decodeURIComponent(pathname)}
          </p>
        </div>
      </Wrapper>
    </Main>
  );
}
