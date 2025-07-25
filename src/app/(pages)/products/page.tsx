import { getProducts } from "@/actions/get-products";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductsTable } from "@/components/products-table";
import { Wrapper } from "@/components/wrapper";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="w-full flex flex-col gap-3">
      <Breadcrumb>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper className="w-full h-full overflow-auto">
        <ProductsTable products={products} />
      </Wrapper>
    </main>
  );
}
