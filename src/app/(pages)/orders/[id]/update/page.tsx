import { getOrder, TGetOrder } from "@/actions/get-order";
import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { UpdateOrderForm } from "@/components/update-order-form";
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
        <Breadcrumb.Item>Update</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <UpdateOrderForm order={order} />
      </Wrapper>
    </Main>
  );
}
