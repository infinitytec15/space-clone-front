"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ConsumptionLineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      values: number[];
      color?: string;
    }>;
  } | null;
  loading?: boolean;
  title?: string;
}

export default function ConsumptionLineChart({
  data,
  loading = false,
  title = "Crescimento do Potencial de Consumo",
}: ConsumptionLineChartProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const defaultColors = [
        "rgba(53, 162, 235, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ];

      setChartData({
        labels: data.labels,
        datasets: data.datasets.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.values,
          borderColor:
            dataset.color || defaultColors[index % defaultColors.length],
          backgroundColor: dataset.color
            ? `${dataset.color.slice(0, -2)}0.1)`
            : `${defaultColors[index % defaultColors.length].slice(0, -2)}0.1)`,
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        })),
      });
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Potencial de Consumo (R$ milhões)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Período",
        },
      },
    },
  };

  return (
    <Card className="bg-white dark:bg-gray-900 h-[300px]">
      <CardContent className="p-4">
        {loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !data ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Nenhum dado disponível</p>
          </div>
        ) : (
          <div className="h-[250px]">
            <Line options={options} data={chartData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
