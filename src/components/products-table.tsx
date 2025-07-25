"use client";

import { Product } from "@prisma/client";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import { Modal } from "./modal";
import { UpdateProductForm } from "./update-product-form";
import { DeleteProductForm } from "./delete-product-form";

export function ProductsTable({ products }: { products: Product[] }) {
  const [productList, setProductList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [deleteFormVisible, setDeleteFormVisible] = useState(false);

  return (
    <>
      <table className="w-full rounded-lg overflow-hidden bg-gray-800/80">
        <thead>
          <tr className="bg-gray-900 [&>th]:p-2 text-sm">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr
              key={product.id}
              className="[&>td]:px-3 [&>td]:py-2 text-sm border-b-[1px] border-gray-700 last:border-none hover:bg-gray-700/20 transition-colors"
            >
              <td>{product.name}</td>
              <td className="text-center">
                {product.price.toLocaleString("pt-br", {
                  currency: "BRL",
                  style: "currency",
                })}
              </td>
              <td className="text-center">
                {product.stock.toLocaleString("pt-br")}
              </td>
              <td className="w-24">
                <div className="flex justify-center items-center gap-1 text-white">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(() => product);
                      setUpdateFormVisible(() => true);
                    }}
                    className="p-1.5 flex bg-gray-700/50 cursor-pointer text-gray-300 justify-center items-center rounded-lg hover:text-white hover:bg-blue-500/80 transition-colors"
                  >
                    <Pen size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(() => product);
                      setDeleteFormVisible(() => true);
                    }}
                    className="p-1.5 flex bg-gray-700/50 cursor-pointer text-gray-300 justify-center items-center rounded-lg hover:text-white hover:bg-red-500/80 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                productList.map((p) => {
                  if (p.id === id) {
                    return {
                      ...p,
                      ...data,
                    };
                  }

                  return p;
                })
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
