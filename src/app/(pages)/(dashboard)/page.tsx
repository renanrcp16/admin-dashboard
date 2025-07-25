import { Breadcrumb } from "@/components/breadcrumb";
import { Wrapper } from "@/components/wrapper";

export default async function DashboardPage() {
  return (
    <main className="w-full flex flex-col gap-3">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper className="w-full h-full justify-center"></Wrapper>
    </main>
  );
}
