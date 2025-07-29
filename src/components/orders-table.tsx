"use client";

import { Pen, Plus, Trash } from "lucide-react";
import { Table } from "./table";
import { LinkButton } from "./link-button";
import { useRouter } from "next/navigation";
import { TGetOrder } from "@/actions/get-orders";

export function OrdersTable({ orders }: { orders: TGetOrder[] }) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-end mb-3">
        <LinkButton href="/orders/create" className="gap-1">
          Add <Plus size={16} />
        </LinkButton>
      </div>
      <Table className="w-full rounded-lg overflow-hidden bg-gray-800/80">
        <Table.Head>
          <Table.Head.Row>
            <Table.Head.Row.Column>#</Table.Head.Row.Column>
            <Table.Head.Row.Column>Customer</Table.Head.Row.Column>
            <Table.Head.Row.Column>Products Qty</Table.Head.Row.Column>
            <Table.Head.Row.Column>Total</Table.Head.Row.Column>
            <Table.Head.Row.Column>Actions</Table.Head.Row.Column>
          </Table.Head.Row>
        </Table.Head>
        <Table.Body>
          {orders.map((order) => (
            <Table.Body.Row key={order.id}>
              <Table.Body.Row.Column>{order.id}</Table.Body.Row.Column>
              <Table.Body.Row.Column className="text-center">
                {order.customer.name}
              </Table.Body.Row.Column>
              <Table.Body.Row.Column className="text-center">
                {order.items.length}
              </Table.Body.Row.Column>
              <Table.Body.Row.Column className="text-center">
                {order.items
                  .reduce((sum, item) => sum + item.price, 0)
                  .toLocaleString("pt-br", {
                    currency: "BRL",
                    style: "currency",
                  })}
              </Table.Body.Row.Column>
              <Table.Body.Row.Column className="w-24">
                <div className="flex justify-center items-center gap-1 text-white">
                  <Table.Body.Row.Column.Action
                    icon={Pen}
                    className="hover:bg-blue-500/80 focus-within:bg-blue-500/80"
                    onClick={() => {
                      router.push(`/orders/${order.id}/update`);
                    }}
                  />
                  <Table.Body.Row.Column.Action
                    icon={Trash}
                    className="hover:bg-red-500/80 focus-within:bg-red-500/80"
                    onClick={() => {
                      router.push(`/orders/${order.id}/update`);
                    }}
                  />
                </div>
              </Table.Body.Row.Column>
            </Table.Body.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
