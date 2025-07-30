"use client";

import { Customer } from "@prisma/client";
import { Pen, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Table } from "./table";
import { Button } from "./button";
import { Modal } from "./modal";
import { CreateCustomerForm } from "./create-customer-form";
import { UpdateCustomerForm } from "./update-customer-form";
import { DeleteCustomerForm } from "./delete-customer-form";

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const [customerList, setCustomerList] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >();
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [deleteFormVisible, setDeleteFormVisible] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button
          className="gap-1"
          onClick={() => {
            setCreateFormVisible(() => true);
          }}
        >
          Add <Plus size={16} />
        </Button>
      </div>
      <Table className="w-full rounded-lg overflow-hidden bg-gray-800/80">
        <Table.Head>
          <Table.Head.Row>
            <Table.Head.Row.Column>Name</Table.Head.Row.Column>
            <Table.Head.Row.Column>Document</Table.Head.Row.Column>
            <Table.Head.Row.Column>Actions</Table.Head.Row.Column>
          </Table.Head.Row>
        </Table.Head>
        <Table.Body>
          {customerList.map((customer) => (
            <Table.Body.Row key={customer.id}>
              <Table.Body.Row.Column>{customer.name}</Table.Body.Row.Column>
              <Table.Body.Row.Column className="text-center">
                {customer.document}
              </Table.Body.Row.Column>
              <Table.Body.Row.Column className="w-24">
                <div className="flex justify-center items-center gap-1 text-white">
                  <Table.Body.Row.Column.Action
                    icon={Pen}
                    className="hover:bg-blue-500/80 focus-visible:bg-blue-500/80"
                    onClick={() => {
                      setSelectedCustomer(() => customer);
                      setUpdateFormVisible(() => true);
                    }}
                  />
                  <Table.Body.Row.Column.Action
                    icon={Trash}
                    className="hover:bg-red-500/80 focus-visible:bg-red-500/80"
                    onClick={() => {
                      setSelectedCustomer(() => customer);
                      setDeleteFormVisible(() => true);
                    }}
                  />
                </div>
              </Table.Body.Row.Column>
            </Table.Body.Row>
          ))}
        </Table.Body>
      </Table>

      {createFormVisible && (
        <Modal
          onCloseButtonClick={() => {
            setCreateFormVisible(() => false);
            setSelectedCustomer(() => undefined);
          }}
          title="Create Customer"
        >
          <CreateCustomerForm
            onFormSubmit={(data) => {
              setCustomerList(() =>
                [...customerList, data].sort((a, b) =>
                  a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
              );

              setCreateFormVisible(() => false);
              setSelectedCustomer(() => undefined);
            }}
          />
        </Modal>
      )}

      {selectedCustomer && updateFormVisible && (
        <Modal
          onCloseButtonClick={() => {
            setUpdateFormVisible(() => false);
            setSelectedCustomer(() => undefined);
          }}
          title="Update Customer"
        >
          <UpdateCustomerForm
            customer={selectedCustomer}
            onFormSubmit={(id, data) => {
              setCustomerList(() =>
                customerList
                  .map((p) => {
                    if (p.id === id) {
                      return {
                        ...p,
                        ...data,
                      };
                    }

                    return p;
                  })
                  .sort((a, b) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                  )
              );

              setUpdateFormVisible(() => false);
              setSelectedCustomer(() => undefined);
            }}
          />
        </Modal>
      )}

      {selectedCustomer && deleteFormVisible && (
        <Modal
          onCloseButtonClick={() => {
            setDeleteFormVisible(() => false);
            setSelectedCustomer(() => undefined);
          }}
          title="Delete Customer"
        >
          <DeleteCustomerForm
            customer={selectedCustomer}
            onFormSubmit={(id) => {
              setCustomerList(() => customerList.filter((p) => p.id !== id));
              setDeleteFormVisible(() => false);
              setSelectedCustomer(() => undefined);
            }}
          />
        </Modal>
      )}
    </>
  );
}
