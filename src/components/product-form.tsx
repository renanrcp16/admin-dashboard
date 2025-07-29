import { Product } from "@prisma/client";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, TProductSchema } from "@/schemas/product.schema";
import { maskNumberInput } from "@/utils/mask-number-input";
import { Button } from "./button";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { Form } from "./form";

type TProductForm = {
  product?: Product;
  formDisabled?: boolean;
  onFormSubmit: (product: TProductSchema) => void;
};

export function ProductForm({
  product,
  formDisabled,
  onFormSubmit,
}: TProductForm) {
  const [isSubmitting, startSubmit] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  function onSubmit(data: TProductSchema) {
    startSubmit(() => {
      onFormSubmit(data);
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <Form.Row>
        <Form.Row.Column>
          <Form.Row.Column.Label htmlFor="name">Name</Form.Row.Column.Label>
          <Input
            id="name"
            defaultValue={product?.name ?? ""}
            disabled={isSubmitting || formDisabled}
            autoFocus
            autoCapitalize="sentences"
            {...register("name")}
          />
          {errors.name && (
            <Form.ErrorMessage>{errors.name.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
      </Form.Row>
      <Form.Row>
        <Form.Row.Column>
          <Form.Row.Column.Label htmlFor="price">Price</Form.Row.Column.Label>
          <Input
            id="price"
            disabled={isSubmitting || formDisabled}
            defaultValue={
              product?.price
                ? maskNumberInput(`${product.price.toFixed(2)}`)
                : "0,00"
            }
            {...register("price", {
              onChange: (e) => {
                e.target.value = maskNumberInput(e.target.value);
              },
            })}
          />
          {errors.price && (
            <Form.ErrorMessage>{errors.price.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
        <Form.Row.Column>
          <Form.Row.Column.Label htmlFor="stock">Stock</Form.Row.Column.Label>
          <Input
            id="stock"
            disabled={isSubmitting || formDisabled}
            defaultValue={
              product?.stock
                ? maskNumberInput(`${product.stock.toFixed(2)}`)
                : "0,00"
            }
            {...register("stock", {
              onChange: (e) => {
                e.target.value = maskNumberInput(e.target.value);
              },
            })}
          />
          {errors.stock && (
            <Form.ErrorMessage>{errors.stock.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
      </Form.Row>

      <Form.Row className=" justify-end">
        <Button disabled={isSubmitting} type="submit" className="h-8">
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </Form.Row>
    </Form>
  );
}
