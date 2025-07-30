import { TGetOrder } from "@/actions/get-order";

export function getMonthlyRevenue(orders: TGetOrder[]) {
  const monthlyRevenue: Record<number, number> = {};

  for (const order of orders) {
    const orderDate = new Date(order.date);
    const month = orderDate.getMonth();

    if (!monthlyRevenue[month]) {
      monthlyRevenue[month] = 0;
    }

    monthlyRevenue[month] += order.totalPrice;
  }

  for (let i = 0; i < 12; i++) {
    if (!monthlyRevenue[i]) {
      monthlyRevenue[i] = 0;
    }
  }

  return monthlyRevenue;
}
