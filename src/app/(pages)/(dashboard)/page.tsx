import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { Wrapper } from "@/components/wrapper";

export default async function DashboardPage() {
  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper className="justify-center items-center text-3xl text-gray-500">
        In development...
      </Wrapper>
    </Main>
  );
}
