"use client";

import { Customer, Order, Product } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import { useEffect, useRef, useState, useTransition } from "react";
import { LoaderCircle, Plus, X } from "lucide-react";
import { orderSchema, TOrderSchema } from "@/schemas/order.schema";
import { Select } from "./select";
import { getCustomers } from "@/actions/get-customers";
import { Input } from "./input";
import { LinkButton } from "./link-button";
import { getProducts } from "@/actions/get-products";
import { maskNumberInput } from "@/utils/mask-number-input";
import { Form } from "./form";

type TOrderForm = {
  order?: Order;
  formDisabled?: boolean;
  onFormSubmit: (order: TOrderSchema) => void;
};

export function OrderForm({ order, formDisabled, onFormSubmit }: TOrderForm) {
  const firstRender = useRef(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, startSubmit] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{}, {}],
    },
  });

  const items = useFieldArray({
    name: "items",
    control,
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      getCustomers().then((data) => {
        setCustomers(() => data);
      });

      getProducts().then((data) => {
        setProducts(() => data);
      });
    }
  }, []);

  function onSubmit(data: any) {
    startSubmit(() => {
      onFormSubmit(data);
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
      <Form.Row>
        <Form.Row.Column>
          <Form.Row.Column.Label htmlFor="customerId">
            Customer
          </Form.Row.Column.Label>
          <Select
            id="customerId"
            {...register("customerId")}
            defaultValue={""}
            disabled={customers.length == 0}
          >
            {customers.map((customer) => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.name}
              </Select.Option>
            ))}
          </Select>
          {errors.customerId && (
            <Form.ErrorMessage>{errors.customerId.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
        <Form.Row.Column>
          <Form.Row.Column.Label htmlFor="date">Date</Form.Row.Column.Label>
          <Input
            id="date"
            disabled={isSubmitting || formDisabled}
            type="date"
            defaultValue={
              order?.date.toLocaleDateString("en-ca") ??
              new Date().toLocaleDateString("en-ca")
            }
            {...register("date")}
          />
          {errors.date && (
            <Form.ErrorMessage>{errors.date.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
      </Form.Row>

      <div className="flex justify-end">
        <Button
          onClick={() =>
            items.append({
              productId: "",
              qty: "0,00",
              price: "0,00",
            })
          }
        >
          Add row <Plus size={16} />
        </Button>
      </div>

      <table className="rounded bg-gray-700/30 w-full text-sm">
        <thead>
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.fields.map((field, index) => (
            <tr key={field.id}>
              {/* Product select */}
              <td className="p-1">
                <div className="h-13 flex flex-col gap-1">
                  <Select
                    {...register(`items.${index}.productId` as const)}
                    defaultValue={field.productId ?? ""}
                    disabled={formDisabled || products.length === 0}
                  >
                    {products.map((product) => (
                      <Select.Option key={product.id} value={product.id}>
                        {product.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {errors.items?.[index]?.productId && (
                    <p className="text-red-500 text-xs">
                      {errors.items[index]?.productId?.message}
                    </p>
                  )}
                </div>
              </td>

              {/* Quantity input */}
              <td className="p-1 w-36">
                <div className="h-13 flex flex-col gap-1">
                  <Input
                    defaultValue={"0,00"}
                    {...register(`items.${index}.qty`, {
                      onChange: (e) => {
                        e.target.value = maskNumberInput(e.target.value);
                      },
                    })}
                    disabled={formDisabled}
                  />
                  {errors.items?.[index]?.qty && (
                    <p className="text-red-500 text-xs">
                      {errors.items[index]?.qty?.message}
                    </p>
                  )}
                </div>
              </td>

              <td className="p-1 w-36">
                <div className="h-13 flex flex-col gap-1">
                  <Input
                    defaultValue={"0,00"}
                    {...register(`items.${index}.price`, {
                      onChange: (e) => {
                        e.target.value = maskNumberInput(e.target.value);
                      },
                    })}
                    disabled={formDisabled}
                  />
                  {errors.items?.[index]?.price && (
                    <p className="text-red-500 text-xs">
                      {errors.items[index]?.price?.message}
                    </p>
                  )}
                </div>
              </td>

              <td className="p-1 w-12 h-13">
                <div className="flex justify-center h-12">
                  <button
                    type="button"
                    onClick={() => items.remove(index)}
                    disabled={items.fields.length == 1}
                    className={
                      "p-1.5 flex bg-gray-700/50 enabled:cursor-pointer text-gray-300 justify-center items-center rounded-lg hover:text-white enabled:hover:bg-gray-500/80 transition-colors disabled:opacity-60 h-fit"
                    }
                  >
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <Button
          onClick={() =>
            items.append({
              productId: "",
              qty: "0,00",
              price: "0,00",
            })
          }
        >
          Add row <Plus size={16} />
        </Button>
      </div>

      <div className="flex justify-between mt-auto">
        <LinkButton
          href="/orders"
          disabled={isSubmitting}
          className="bg-gray-700"
        >
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            "Cancel"
          )}
        </LinkButton>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </div>
    </Form>
  );
}
