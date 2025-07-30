"use client";

import { Customer, Product } from "@prisma/client";
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
import { formatToNumberZodSchema } from "@/utils/format-to-number-zod-schema";
import { TGetOrder } from "@/actions/get-order";

type TOrderForm = {
  order?: TGetOrder;
  formDisabled?: boolean;
  onFormSubmit: (order: TOrderSchema) => void;
};

type OrderCustomers = Pick<Customer, "id" | "name">;
type OrderProducts = Pick<Product, "id" | "name" | "price">;

export function OrderForm({ order, formDisabled, onFormSubmit }: TOrderForm) {
  const [disabledSelect, setDisabledSelect] = useState(true);
  const defaultCustomer: OrderCustomers | undefined = order
    ? {
        id: order.customer.id,
        name: order.customer.name,
      }
    : undefined;

  const defaultProducts: OrderProducts[] = order
    ? order.items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: 0,
      }))
    : [];

  const defaultItems = order?.items.map((item) => ({
    price: maskNumberInput(`${item.price.toFixed(2)}`),
    productId: item.product.id ?? "",
    qty: maskNumberInput(`${item.qty.toFixed(2)}`),
    total: maskNumberInput(`${item.total.toFixed(2)}`),
  })) || [{ price: "0,00", productId: "", qty: "0,00", total: "0,00" }];

  const firstRender = useRef(true);
  const [customers, setCustomers] = useState<OrderCustomers[]>(
    defaultCustomer ? [defaultCustomer] : []
  );
  const [products, setProducts] = useState<OrderProducts[]>(defaultProducts);
  const [isSubmitting, startSubmit] = useTransition();
  const defaultDate = order?.date || new Date();
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: order?.customer.id || "",
      date: defaultDate.toLocaleDateString("en-ca"),
      items: defaultItems,
    },
  });

  const items = useFieldArray({
    name: "items",
    control,
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      (async () => {
        await Promise.all([
          getCustomers().then((data) => {
            setCustomers(() => data.map((c) => ({ id: c.id, name: c.name })));
          }),

          getProducts().then((data) => {
            setProducts(() =>
              data.map((p) => ({ id: p.id, name: p.name, price: p.price }))
            );
          }),
        ]);

        setDisabledSelect(() => false);
      })();
    }
  }, []);

  function onSubmit(data: TOrderSchema) {
    startSubmit(() => {
      onFormSubmit({
        ...data,
        date: new Date(
          data.date.getFullYear(),
          data.date.getMonth(),
          data.date.getDate() + 1
        ),
      });
    });
  }

  function getTotal(qtyString: string, priceString: string) {
    const qty = formatToNumberZodSchema(qtyString);
    const price = formatToNumberZodSchema(priceString);

    const total = qty * price;

    return total.toLocaleString("pt-br", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
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
            disabled={customers.length == 0 || disabledSelect || formDisabled}
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
            {...register("date")}
          />
          {errors.date && (
            <Form.ErrorMessage>{errors.date.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
      </Form.Row>

      {!formDisabled && (
        <div className="flex justify-end">
          <Button
            onClick={() =>
              items.append({
                productId: "",
                qty: "0,00",
                price: "0,00",
                total: "0,00",
              })
            }
          >
            Add row <Plus size={16} />
          </Button>
        </div>
      )}

      <div className="max-h-96 overflow-auto">
        <table className="rounded-lg bg-gray-700/30 w-full text-sm">
          <thead>
            <tr className="[&>th]:p-1.5">
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              {!formDisabled && <th></th>}
            </tr>
          </thead>
          <tbody>
            {items.fields.map((field, index) => (
              <tr
                key={field.id}
                className="[&>td]:px-1 [&>td]:pb-1.5 [&>td]:first:pl-2"
              >
                <td>
                  <Select
                    {...register(`items.${index}.productId` as const)}
                    data-error={
                      errors.items && !!errors.items[index]?.productId?.message
                    }
                    className="data-[error=true]:ring-1 ring-red-500/60"
                    disabled={
                      formDisabled || products.length === 0 || disabledSelect
                    }
                    onChange={(e) => {
                      const p = products.find((p) => p.id == e.target.value);

                      if (p) {
                        setValue(
                          `items.${index}.price`,
                          maskNumberInput(`${p.price}`)
                        );

                        const qty = getValues(`items.${index}.qty`);
                        const total = getTotal(
                          qty,
                          maskNumberInput(`${p.price}`)
                        );

                        setValue(`items.${index}.total`, total);
                      }
                    }}
                  >
                    {products.map((product) => (
                      <Select.Option key={product.id} value={product.id}>
                        {product.name}
                      </Select.Option>
                    ))}
                  </Select>
                </td>
                <td className="w-32">
                  <Input
                    disabled={formDisabled}
                    data-error={
                      errors.items && !!errors.items[index]?.qty?.message
                    }
                    className="data-[error=true]:ring-1 ring-red-500/60"
                    {...register(`items.${index}.qty`, {
                      onChange: (e) => {
                        const qty = maskNumberInput(e.target.value);
                        const price = getValues(`items.${index}.price`);
                        e.target.value = qty;

                        const total = getTotal(qty, price);

                        setValue(`items.${index}.total`, total);
                      },
                    })}
                  />
                </td>
                <td className="w-32">
                  <Input
                    disabled={formDisabled}
                    data-error={
                      errors.items && !!errors.items[index]?.price?.message
                    }
                    className="data-[error=true]:ring-1 ring-red-500/60"
                    {...register(`items.${index}.price`, {
                      onChange: (e) => {
                        const price = maskNumberInput(e.target.value);
                        const qty = getValues(`items.${index}.qty`);
                        e.target.value = price;

                        const total = getTotal(qty, price);

                        setValue(`items.${index}.total`, total);
                      },
                    })}
                  />
                </td>
                <td className="w-32">
                  <Input {...register(`items.${index}.total`)} readOnly />
                </td>
                {!formDisabled && (
                  <td className="w-12">
                    <div className="flex justify-center">
                      <Button
                        disabled={items.fields.length === 1}
                        onClick={() => items.remove(index)}
                        className="bg-red-600/40 min-w-0"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-auto">
        <LinkButton
          href="/orders"
          disabled={isSubmitting}
          className="bg-gray-700"
        >
          Cancel
        </LinkButton>
        <Button disabled={isSubmitting} type="submit" className="h-8">
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin " />
          ) : (
            "Confirm"
          )}
        </Button>
      </div>
    </Form>
  );
}
