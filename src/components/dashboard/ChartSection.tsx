"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
);

interface ChartSectionProps {
  selectedRegion?: string;
  selectedFilters?: any;
  chartData?: {
    demographic?: any;
    economic?: any;
    consumption?: any;
  };
}

const ChartSection = ({
  selectedRegion = "Brasil",
  selectedFilters = {},
  chartData = {
    demographic: {
      ageGroups: [15, 25, 30, 20, 10],
      genderDistribution: [48, 52],
      educationLevels: [10, 25, 35, 30],
    },
    economic: {
      incomeDistribution: [5, 15, 30, 35, 15],
      monthlyTrend: [42, 45, 50, 49, 53, 55, 60],
      sectors: [30, 25, 15, 20, 10],
    },
    consumption: {
      categories: [20, 15, 25, 10, 30],
      monthlySpending: [1200, 1250, 1300, 1280, 1350, 1400],
      channelPreference: [40, 35, 25],
    },
  },
}: ChartSectionProps) => {
  const [activeTab, setActiveTab] = useState("demographic");
  const [chartType, setChartType] = useState("bar");
  const [chartInstance, setChartInstance] = useState<any>(null);

  // Chart colors
  const chartColors = {
    blue: {
      primary: "rgba(53, 162, 235, 0.8)",
      secondary: "rgba(53, 162, 235, 0.2)",
    },
    green: {
      primary: "rgba(75, 192, 192, 0.8)",
      secondary: "rgba(75, 192, 192, 0.2)",
    },
    red: {
      primary: "rgba(255, 99, 132, 0.8)",
      secondary: "rgba(255, 99, 132, 0.2)",
    },
    orange: {
      primary: "rgba(255, 159, 64, 0.8)",
      secondary: "rgba(255, 159, 64, 0.2)",
    },
    purple: {
      primary: "rgba(153, 102, 255, 0.8)",
      secondary: "rgba(153, 102, 255, 0.2)",
    },
  };

  // Chart data preparation
  const prepareBarChartData = () => {
    let labels: string[] = [];
    let data: number[] = [];
    let title = "";

    switch (activeTab) {
      case "demographic":
        labels = ["0-14", "15-29", "30-44", "45-59", "60+"];
        data = chartData.demographic.ageGroups;
        title = "Distribuição por Faixa Etária";
        break;
      case "economic":
        labels = ["A", "B1", "B2", "C1", "C2", "D/E"];
        data = chartData.economic.incomeDistribution;
        title = "Distribuição de Renda";
        break;
      case "consumption":
        labels = ["Alimentação", "Moradia", "Transporte", "Saúde", "Educação"];
        data = chartData.consumption.categories;
        title = "Categorias de Consumo";
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: [
            chartColors.blue.primary,
            chartColors.green.primary,
            chartColors.red.primary,
            chartColors.orange.primary,
            chartColors.purple.primary,
          ],
          borderColor: [
            chartColors.blue.primary,
            chartColors.green.primary,
            chartColors.red.primary,
            chartColors.orange.primary,
            chartColors.purple.primary,
          ],
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  };

  const prepareLineChartData = () => {
    let labels: string[] = [];
    let data: number[] = [];
    let title = "";

    switch (activeTab) {
      case "demographic":
        labels = ["2018", "2019", "2020", "2021", "2022", "2023"];
        data = [42, 45, 43, 47, 49, 52];
        title = "Evolução Populacional";
        break;
      case "economic":
        labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"];
        data = chartData.economic.monthlyTrend;
        title = "Tendência de Renda Mensal";
        break;
      case "consumption":
        labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
        data = chartData.consumption.monthlySpending;
        title = "Gastos Mensais";
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          fill: true,
          backgroundColor: chartColors.blue.secondary,
          borderColor: chartColors.blue.primary,
          tension: 0.4,
          pointBackgroundColor: chartColors.blue.primary,
          pointBorderColor: "#fff",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const preparePieChartData = () => {
    let labels: string[] = [];
    let data: number[] = [];
    let title = "";

    switch (activeTab) {
      case "demographic":
        labels = ["Masculino", "Feminino"];
        data = chartData.demographic.genderDistribution;
        title = "Distribuição por Gênero";
        break;
      case "economic":
        labels = [
          "Serviços",
          "Indústria",
          "Comércio",
          "Agropecuária",
          "Outros",
        ];
        data = chartData.economic.sectors;
        title = "Setores Econômicos";
        break;
      case "consumption":
        labels = ["Físico", "Online", "Híbrido"];
        data = chartData.consumption.channelPreference;
        title = "Preferência de Canais";
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: [
            chartColors.blue.primary,
            chartColors.green.primary,
            chartColors.red.primary,
            chartColors.orange.primary,
            chartColors.purple.primary,
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value: any) {
            return value + "%";
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  const getChartData = () => {
    switch (chartType) {
      case "bar":
        return prepareBarChartData();
      case "line":
        return prepareLineChartData();
      case "pie":
        return preparePieChartData();
      default:
        return prepareBarChartData();
    }
  };

  const getChartOptions = () => {
    switch (chartType) {
      case "bar":
        return barChartOptions;
      case "line":
        return lineChartOptions;
      case "pie":
        return pieChartOptions;
      default:
        return barChartOptions;
    }
  };

  const renderChart = () => {
    const data = getChartData();
    const options = getChartOptions();

    switch (chartType) {
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      default:
        return <Bar data={data} options={options} />;
    }
  };

  const getChartTitle = () => {
    switch (activeTab) {
      case "demographic":
        return chartType === "bar"
          ? "Distribuição por Faixa Etária"
          : chartType === "pie"
            ? "Distribuição por Gênero"
            : "Evolução Populacional";
      case "economic":
        return chartType === "bar"
          ? "Distribuição de Renda"
          : chartType === "line"
            ? "Tendência de Renda Mensal"
            : "Setores Econômicos";
      case "consumption":
        return chartType === "bar"
          ? "Categorias de Consumo"
          : chartType === "line"
            ? "Gastos Mensais"
            : "Preferência de Canais";
      default:
        return "Dados";
    }
  };

  const getChartDescription = () => {
    switch (activeTab) {
      case "demographic":
        return "Dados demográficos da região selecionada";
      case "economic":
        return "Indicadores econômicos e tendências";
      case "consumption":
        return "Padrões de consumo e preferências";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full bg-white border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              Análise de Dados: {selectedRegion}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info
                      size={16}
                      className="text-muted-foreground cursor-help"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualização de dados para a região selecionada</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {getChartDescription()}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setChartType("bar")}
              className={`p-1.5 rounded-md ${chartType === "bar" ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100"}`}
              aria-label="Gráfico de barras"
            >
              <BarChart size={18} />
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`p-1.5 rounded-md ${chartType === "line" ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100"}`}
              aria-label="Gráfico de linha"
            >
              <LineChart size={18} />
            </button>
            <button
              onClick={() => setChartType("pie")}
              className={`p-1.5 rounded-md ${chartType === "pie" ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100"}`}
              aria-label="Gráfico de pizza"
            >
              <PieChart size={18} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="demographic"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
            <TabsTrigger
              value="demographic"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              Demográfico
            </TabsTrigger>
            <TabsTrigger
              value="economic"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              Econômico
            </TabsTrigger>
            <TabsTrigger
              value="consumption"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              Consumo
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">{getChartTitle()}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight size={16} className="mr-1" /> 12.5%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    vs. média nacional
                  </span>
                </div>
              </div>

              <div className="h-[220px] w-full">{renderChart()}</div>

              <div className="text-right text-xs text-muted-foreground">
                Dados ilustrativos
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
