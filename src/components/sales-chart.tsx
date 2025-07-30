"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
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

const labels = [...Array(12)].map((_, i) =>
  new Date(0, i).toLocaleString("en-US", { month: "short" })
);

export function SalesChart({
  monthlyRevenue,
}: {
  monthlyRevenue: Record<number, number>;
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: labels.map((_, i) => monthlyRevenue[i] || 0),
        backgroundColor: "rgba(53, 162, 235, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },

      title: {
        display: true,
        text: "Monthly Revenue",
        color: "#c4c4c4",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
            return value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          },
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
