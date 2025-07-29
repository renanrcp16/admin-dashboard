import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { Wrapper } from "@/components/wrapper";

export default async function DashboardPage() {
  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper></Wrapper>
    </Main>
  );
}
