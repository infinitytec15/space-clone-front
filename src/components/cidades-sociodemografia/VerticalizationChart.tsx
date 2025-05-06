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

interface VerticalizationChartProps {
  data?: {
    regions: string[];
    apartmentPercentage: number[];
    housePercentage: number[];
  };
  loading?: boolean;
}

const VerticalizationChart = ({
  data,
  loading = false,
}: VerticalizationChartProps) => {
  // Default data if none is provided
  const defaultData = {
    regions: ["Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste"],
    apartmentPercentage: [75, 45, 65, 30, 50],
    housePercentage: [25, 55, 35, 70, 50],
  };

  const displayData = data || defaultData;

  const chartData = {
    labels: displayData.regions,
    datasets: [
      {
        label: "Apartamentos (%)",
        data: displayData.apartmentPercentage,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Casas (%)",
        data: displayData.housePercentage,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Porcentagem (%)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + "%";
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
        <CardTitle className="text-lg font-medium">
          Comparativo de Verticalização
        </CardTitle>
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

export default VerticalizationChart;
