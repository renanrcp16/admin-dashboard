"use client";

import { Bar } from "react-chartjs-2";

export function TopProductsChart({
  products,
}: {
  products: { name: string; qty: number }[];
}) {
  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Units Sold",
        data: products.map((p) => p.qty),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: { display: false },

      title: {
        display: true,
        text: "Top Selling Products",
        color: "#c4c4c4",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-700/30 p-4 rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
}
