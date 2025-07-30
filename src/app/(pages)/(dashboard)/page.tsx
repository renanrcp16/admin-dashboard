import { getOrders } from "@/actions/get-orders";
import { Breadcrumb } from "@/components/breadcrumb";
import { Main } from "@/components/main";
import { KpiCard } from "@/components/kpi-card";
import { Wrapper } from "@/components/wrapper";
import { getMonthlyRevenue } from "@/utils/get-monthly-revenue";
import { getMonthlyItemsSold } from "@/utils/get-monthly-items-sold";
import { SalesChart } from "@/components/sales-chart";
import { ItemsSoldChart } from "@/components/items-sold-chart";
import { getProductSales } from "@/utils/get-product-sales";
import { TopProductsChart } from "@/components/top-products-chart";
import { getTopCustomers } from "@/utils/get-top-customers";
import { TopCustomersChart } from "@/components/top-customers-chart";

export default async function DashboardPage() {
  const orders = await getOrders();
  const filteredOrders = orders.filter(
    (o) => o.date.getFullYear() === new Date().getFullYear()
  );

  const productSales = getProductSales(filteredOrders);
  const monthlyRevenue = getMonthlyRevenue(filteredOrders);
  const monthlyItemsSold = getMonthlyItemsSold(filteredOrders);
  const topCustomers = getTopCustomers(filteredOrders);

  const totalRevenue = Object.values(monthlyRevenue).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalItemsSold = Object.values(monthlyItemsSold).reduce(
    (sum, val) => sum + val,
    0
  );
  const averageTicket = (totalRevenue / filteredOrders.length).toLocaleString(
    "pt-br",
    {
      currency: "BRL",
      style: "currency",
    }
  );

  return (
    <Main>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <Wrapper className="gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard
            label="Faturamento Anual"
            value={totalRevenue.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
            })}
          />
          <KpiCard
            label="Itens Vendidos"
            value={totalItemsSold.toLocaleString("pt-br", { currency: "BRL" })}
          />
          <KpiCard label="Ticket Médio" value={averageTicket} />
          <KpiCard label="Total de Pedidos" value={filteredOrders.length} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SalesChart monthlyRevenue={monthlyRevenue} />
          <ItemsSoldChart monthlyItemsSold={monthlyItemsSold} />
          <TopProductsChart products={productSales} />
          <TopCustomersChart customers={topCustomers} />
        </div>
      </Wrapper>
    </Main>
  );
}
