"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface AgePyramidChartProps {
  data?: {
    maleData: number[];
    femaleData: number[];
    ageGroups: string[];
  };
  loading?: boolean;
}

const AgePyramidChart = ({ data, loading = false }: AgePyramidChartProps) => {
  // Default data if none is provided
  const defaultData = {
    maleData: [5, 10, 15, 20, 25, 20, 15, 10, 5],
    femaleData: [-5, -10, -15, -20, -25, -20, -15, -10, -5], // Negative values for left side of pyramid
    ageGroups: [
      "0-9",
      "10-19",
      "20-29",
      "30-39",
      "40-49",
      "50-59",
      "60-69",
      "70-79",
      "80+",
    ],
  };

  const displayData = data || defaultData;

  const chartData = {
    labels: displayData.ageGroups,
    datasets: [
      {
        label: "Homens",
        data: displayData.maleData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Mulheres",
        data: displayData.femaleData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        ticks: {
          callback: function (value: any) {
            return Math.abs(Number(value)) + "%";
          },
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.x !== null) {
              label += Math.abs(context.parsed.x) + "%";
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Card className="bg-white dark:bg-gray-900 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Pirâmide Etária</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgePyramidChart;
