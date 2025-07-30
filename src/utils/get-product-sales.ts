import { TGetOrder } from "@/actions/get-order";

export function getProductSales(orders: TGetOrder[]) {
  const productMap = new Map<string, { name: string; qty: number }>();

  orders.forEach((order) => {
    order.items.forEach(({ product, qty }) => {
      if (!productMap.has(product.id)) {
        productMap.set(product.id, { name: product.name, qty: 0 });
      }
      const prod = productMap.get(product.id)!;
      prod.qty += qty;
    });
  });

  return [...productMap.values()].sort((a, b) => b.qty - a.qty);
}
