import { Customer } from "@prisma/client";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, TCustomerSchema } from "@/schemas/customer.schema";
import { maskNumberInput } from "@/utils/mask-number-input";
import { Button } from "./button";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { Form } from "./form";

type TCustomerForm = {
  customer?: Customer;
  formDisabled?: boolean;
  onFormSubmit: (customer: TCustomerSchema) => void;
};

export function CustomerForm({
  customer,
  formDisabled,
  onFormSubmit,
}: TCustomerForm) {
  const [isSubmitting, startSubmit] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
  });

  function onSubmit(data: TCustomerSchema) {
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
            defaultValue={customer?.name ?? ""}
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
          <Form.Row.Column.Label htmlFor="document">
            Document
          </Form.Row.Column.Label>
          <Input
            id="document"
            disabled={isSubmitting || formDisabled}
            defaultValue={customer?.document ?? ""}
            {...register("document")}
          />
          {errors.document && (
            <Form.ErrorMessage>{errors.document.message}</Form.ErrorMessage>
          )}
        </Form.Row.Column>
      </Form.Row>

      <Form.Row className="justify-end">
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
