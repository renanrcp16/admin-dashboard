import { getProducts } from "@/actions/get-products";
import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { ProductsTable } from "@/components/products-table";
import { Wrapper } from "@/components/wrapper";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <ProductsTable products={products} />
      </Wrapper>
    </Main>
  );
}
