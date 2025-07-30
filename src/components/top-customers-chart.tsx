"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

type TopCustomer = {
  name: string;
  total: number;
};

export function TopCustomersChart({ customers }: { customers: TopCustomer[] }) {
  const labels = customers.map((c) => c.name);
  const dataValues = customers.map((c) => c.total);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue (BRL)",
        data: dataValues,
        backgroundColor: "rgba(34,197,94,0.7)",
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Top 5 Customers by Revenue",
        color: "#c4c4c4",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.raw as number;
            return `R$ ${value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          callback: function (tickValue) {
            const value =
              typeof tickValue === "number"
                ? tickValue
                : parseFloat(tickValue as string);
            return value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          },
        },
      },
      y: {
        ticks: {
          color: "#ccc",
        },
      },
    },
  };

  return (
    <div className="bg-gray-700/30 p-4 rounded-lg shadow-md">
      <Bar options={options} data={data} />
    </div>
  );
}
