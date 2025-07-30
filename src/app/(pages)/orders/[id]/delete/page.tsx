import { getOrder, TGetOrder } from "@/actions/get-order";
import { Breadcrumb } from "@/components/breadcrumb";
import { DeleteOrderForm } from "@/components/delete-order-form";
import { Main } from "@/components/main";
import { Wrapper } from "@/components/wrapper";
import { notFound } from "next/navigation";

export default async function UpdateOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    notFound();
  }

  const order = await getOrder(+id);

  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item href="/orders">Orders</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>{order.id}</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>Delete</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <DeleteOrderForm order={order} />
      </Wrapper>
    </Main>
  );
}
