import { getOrders } from "@/actions/get-orders";
import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { OrdersTable } from "@/components/orders-table";
import { Wrapper } from "@/components/wrapper";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <OrdersTable orders={orders} />
      </Wrapper>
    </Main>
  );
}
