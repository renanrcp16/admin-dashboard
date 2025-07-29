import { getCustomers } from "@/actions/get-customers";
import { Breadcrumb } from "@/components/breadcrumb";
import { CustomersTable } from "@/components/customers-table";
import { Main } from "@/components/main";
import { Wrapper } from "@/components/wrapper";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Customers</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <CustomersTable customers={customers} />
      </Wrapper>
    </Main>
  );
}
