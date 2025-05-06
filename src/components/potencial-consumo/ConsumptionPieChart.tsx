"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface ConsumptionPieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors?: string[];
  } | null;
  loading?: boolean;
  title?: string;
}

export default function ConsumptionPieChart({
  data,
  loading = false,
  title = "Distribuição por Categoria de Consumo",
}: ConsumptionPieChartProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const defaultColors = [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
      ];

      setChartData({
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: data.colors || defaultColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: title,
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
            <Pie options={options} data={chartData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
