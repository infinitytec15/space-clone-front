"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChartSectionProps {
  selectedRegion?: string;
  chartData?: {
    demographic?: any;
    economic?: any;
    consumption?: any;
  };
}

const ChartSection = ({
  selectedRegion = "Brasil",
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

  // Placeholder for chart rendering - in a real implementation, this would use Chart.js
  const renderChart = (type: string, data: any) => {
    return (
      <div className="h-[220px] w-full flex items-center justify-center bg-muted/20 rounded-md relative">
        {type === "bar" && (
          <div className="flex items-end justify-around w-full h-[180px] px-4">
            {Array.isArray(data) &&
              data.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-12 bg-primary/80 hover:bg-primary transition-all rounded-t-sm"
                    style={{ height: `${(value / Math.max(...data)) * 160}px` }}
                  />
                  <span className="text-xs mt-1">{`${index + 1}`}</span>
                </div>
              ))}
          </div>
        )}

        {type === "line" && (
          <div className="flex items-end justify-around w-full h-[180px] px-4 relative">
            <div className="absolute inset-0 flex items-center">
              <svg
                className="w-full h-[160px]"
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
              >
                <polyline
                  points={
                    Array.isArray(data)
                      ? data
                          .map(
                            (value, index) =>
                              `${(index / (data.length - 1)) * 300}, ${100 - (value / Math.max(...data)) * 100}`,
                          )
                          .join(" ")
                      : ""
                  }
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
              </svg>
            </div>
            {Array.isArray(data) &&
              data.map((_, index) => (
                <div
                  key={index}
                  className="h-full flex flex-col justify-end items-center z-10"
                >
                  <div className="w-1 h-1 rounded-full bg-primary mb-1" />
                  <span className="text-xs">{`${index + 1}`}</span>
                </div>
              ))}
          </div>
        )}

        {type === "pie" && (
          <div className="relative w-[180px] h-[180px]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.isArray(data) &&
                data.map((value, index) => {
                  const total = data.reduce((sum, val) => sum + val, 0);
                  const startAngle = data
                    .slice(0, index)
                    .reduce((sum, val) => sum + (val / total) * 360, 0);
                  const endAngle = startAngle + (value / total) * 360;

                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);

                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                  const colors = [
                    "hsl(var(--primary))",
                    "hsl(var(--primary) / 0.8)",
                    "hsl(var(--primary) / 0.6)",
                    "hsl(var(--primary) / 0.4)",
                    "hsl(var(--primary) / 0.2)",
                  ];

                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={colors[index % colors.length]}
                    />
                  );
                })}
            </svg>
          </div>
        )}

        <div className="absolute top-2 right-2 text-xs text-muted-foreground">
          Dados ilustrativos
        </div>
      </div>
    );
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "demographic":
        return chartType === "bar"
          ? chartData.demographic.ageGroups
          : chartType === "pie"
            ? chartData.demographic.genderDistribution
            : chartData.demographic.educationLevels;
      case "economic":
        return chartType === "bar"
          ? chartData.economic.incomeDistribution
          : chartType === "line"
            ? chartData.economic.monthlyTrend
            : chartData.economic.sectors;
      case "consumption":
        return chartType === "bar"
          ? chartData.consumption.categories
          : chartType === "line"
            ? chartData.consumption.monthlySpending
            : chartData.consumption.channelPreference;
      default:
        return [];
    }
  };

  const getChartTitle = () => {
    switch (activeTab) {
      case "demographic":
        return chartType === "bar"
          ? "Distribuição por Faixa Etária"
          : chartType === "pie"
            ? "Distribuição por Gênero"
            : "Níveis de Escolaridade";
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
    <Card className="w-full bg-background border shadow-sm">
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
              className={`p-1.5 rounded-md ${chartType === "bar" ? "bg-muted" : "hover:bg-muted/50"}`}
              aria-label="Gráfico de barras"
            >
              <BarChart size={18} />
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`p-1.5 rounded-md ${chartType === "line" ? "bg-muted" : "hover:bg-muted/50"}`}
              aria-label="Gráfico de linha"
            >
              <LineChart size={18} />
            </button>
            <button
              onClick={() => setChartType("pie")}
              className={`p-1.5 rounded-md ${chartType === "pie" ? "bg-muted" : "hover:bg-muted/50"}`}
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
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="demographic">Demográfico</TabsTrigger>
            <TabsTrigger value="economic">Econômico</TabsTrigger>
            <TabsTrigger value="consumption">Consumo</TabsTrigger>
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

              {renderChart(chartType, getActiveData())}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
