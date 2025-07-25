import { Product } from "@prisma/client";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, TProductSchema } from "@/schemas/product.schema";
import { maskNumberInput } from "@/utils/mask-number-input";
import { Button } from "./button";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <Input
            id="name"
            defaultValue={product?.name ?? ""}
            disabled={isSubmitting || formDisabled}
            autoFocus
            autoCapitalize="sentences"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="price" className="text-sm">
            Price
          </label>
          <Input
            id="price"
            disabled={isSubmitting || formDisabled}
            defaultValue={
              product?.price
                ? maskNumberInput(`${product.price.toFixed(2)}`)
                : 0
            }
            {...register("price", {
              onChange: (e) => {
                e.target.value = maskNumberInput(e.target.value);
              },
            })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="stock" className="text-sm">
            Stock
          </label>
          <Input
            id="stock"
            disabled={isSubmitting || formDisabled}
            defaultValue={
              product?.stock
                ? maskNumberInput(`${product.stock.toFixed(2)}`)
                : 0
            }
            {...register("stock", {
              onChange: (e) => {
                e.target.value = maskNumberInput(e.target.value);
              },
            })}
          />
          {errors.stock && (
            <span className="text-red-500 text-sm">{errors.stock.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={isSubmitting} type="submit" className="h-8">
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </div>
    </form>
  );
}
