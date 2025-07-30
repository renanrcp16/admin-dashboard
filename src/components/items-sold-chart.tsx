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

export function ItemsSoldChart({
  monthlyItemsSold,
}: {
  monthlyItemsSold: Record<number, number>;
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Items Sold",
        data: labels.map((_, i) => monthlyItemsSold[i] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        text: "Items Sold per Month",
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
          stepSize: 1,
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
