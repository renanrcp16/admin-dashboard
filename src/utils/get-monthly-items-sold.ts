import { TGetOrder } from "@/actions/get-order";

export function getMonthlyItemsSold(orders: TGetOrder[]) {
  const monthlyItemsSold: Record<number, number> = {};

  for (const order of orders) {
    const orderDate = new Date(order.date);
    const month = orderDate.getMonth();

    if (!monthlyItemsSold[month]) {
      monthlyItemsSold[month] = 0;
    }

    for (const item of order.items) {
      monthlyItemsSold[month] += item.qty;
    }
  }

  for (let i = 0; i < 12; i++) {
    if (!monthlyItemsSold[i]) {
      monthlyItemsSold[i] = 0;
    }
  }

  return monthlyItemsSold;
}
