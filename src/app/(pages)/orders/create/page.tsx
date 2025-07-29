"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { OrderForm } from "@/components/order-form";
import { Wrapper } from "@/components/wrapper";

export default function CreateOrderPage() {
  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item href="/orders">Orders</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <OrderForm
          onFormSubmit={(data) => {
            console.log(data);
          }}
        />
      </Wrapper>
    </Main>
  );
}
