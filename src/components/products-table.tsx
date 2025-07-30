"use client";

import { Product } from "@prisma/client";
import { Pen, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Modal } from "./modal";
import { UpdateProductForm } from "./update-product-form";
import { DeleteProductForm } from "./delete-product-form";
import { Table } from "./table";
import { Button } from "./button";
import { CreateProductForm } from "./create-product-form";

export function ProductsTable({ products }: { products: Product[] }) {
  const [productList, setProductList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
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
            <Table.Head.Row.Column>Price</Table.Head.Row.Column>
            <Table.Head.Row.Column>Stock</Table.Head.Row.Column>
            <Table.Head.Row.Column>Actions</Table.Head.Row.Column>
          </Table.Head.Row>
        </Table.Head>
        <Table.Body>
          {productList.map((product) => (
            <Table.Body.Row key={product.id}>
              <Table.Body.Row.Column>{product.name}</Table.Body.Row.Column>
              <Table.Body.Row.Column className="text-center">
                {product.price.toLocaleString("pt-br", {
                  currency: "BRL",
                  style: "currency",
                })}
              </Table.Body.Row.Column>
              <Table.Body.Row.Column className="text-center">
                {product.stock.toLocaleString("pt-br")}
              </Table.Body.Row.Column>
              <Table.Body.Row.Column className="w-24">
                <div className="flex justify-center items-center gap-1 text-white">
                  <Table.Body.Row.Column.Action
                    icon={Pen}
                    className="hover:bg-blue-500/80 focus-visible:bg-blue-500/80"
                    onClick={() => {
                      setSelectedProduct(() => product);
                      setUpdateFormVisible(() => true);
                    }}
                  />
                  <Table.Body.Row.Column.Action
                    icon={Trash}
                    className="hover:bg-red-500/80 focus-visible:bg-red-500/80"
                    onClick={() => {
                      setSelectedProduct(() => product);
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
            setSelectedProduct(() => undefined);
          }}
          title="Create Product"
        >
          <CreateProductForm
            onFormSubmit={(data) => {
              setProductList(() =>
                [...productList, data].sort((a, b) =>
                  a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
              );

              setCreateFormVisible(() => false);
              setSelectedProduct(() => undefined);
            }}
          />
        </Modal>
      )}

      {selectedProduct && updateFormVisible && (
        <Modal
          onCloseButtonClick={() => {
            setUpdateFormVisible(() => false);
            setSelectedProduct(() => undefined);
          }}
          title="Update Product"
        >
          <UpdateProductForm
            product={selectedProduct}
            onFormSubmit={(id, data) => {
              setProductList(() =>
                productList
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
              setSelectedProduct(() => undefined);
            }}
          />
        </Modal>
      )}

      {selectedProduct && deleteFormVisible && (
        <Modal
          onCloseButtonClick={() => {
            setDeleteFormVisible(() => false);
            setSelectedProduct(() => undefined);
          }}
          title="Delete Product"
        >
          <DeleteProductForm
            product={selectedProduct}
            onFormSubmit={(id) => {
              setProductList(() => productList.filter((p) => p.id !== id));

              setDeleteFormVisible(() => false);
              setSelectedProduct(() => undefined);
            }}
          />
        </Modal>
      )}
    </>
  );
}
