"use client";

import React from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface PopulationEvolutionChartProps {
  data?: {
    years: string[];
    population: number[];
    growthRate: number[];
  };
  loading?: boolean;
}

const PopulationEvolutionChart = ({
  data,
  loading = false,
}: PopulationEvolutionChartProps) => {
  // Default data if none is provided
  const defaultData = {
    years: ["2010", "2012", "2014", "2016", "2018", "2020", "2022"],
    population: [1000000, 1050000, 1100000, 1160000, 1230000, 1310000, 1400000],
    growthRate: [null, 5, 4.76, 5.45, 6.03, 6.5, 6.87],
  };

  const displayData = data || defaultData;

  const chartData = {
    labels: displayData.years,
    datasets: [
      {
        label: "População",
        data: displayData.population,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Taxa de Crescimento (%)",
        data: displayData.growthRate,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0)",
        yAxisID: "y1",
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "População",
        },
        ticks: {
          callback: function (value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + "K";
            }
            return value;
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Taxa de Crescimento (%)",
        },
        min: 0,
        max: 10,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <Card className="bg-white dark:bg-gray-900 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Evolução Populacional
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <Line data={chartData} options={options} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PopulationEvolutionChart;
