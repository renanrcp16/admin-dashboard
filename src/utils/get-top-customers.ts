import { TGetOrder } from "@/actions/get-order";

export function getTopCustomers(orders: TGetOrder[], limit = 5) {
  const customerTotals: Record<string, { name: string; total: number }> = {};

  orders.forEach((order) => {
    const { id, name } = order.customer;
    if (!customerTotals[id]) {
      customerTotals[id] = { name, total: 0 };
    }
    customerTotals[id].total += order.totalPrice;
  });

  return Object.values(customerTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}
