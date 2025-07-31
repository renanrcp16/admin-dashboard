"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { CreateOrderForm } from "@/components/create-order-form";
import { Main } from "@/components/main";
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
        <CreateOrderForm
          onFormSubmit={(data) => {
            console.log(data);
          }}
        />
      </Wrapper>
    </Main>
  );
}
