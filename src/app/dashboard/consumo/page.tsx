"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import { ShoppingCart, CreditCard, TrendingUp, Percent } from "lucide-react";

export default function ConsumoPage() {
  // Dados simulados para os KPIs
  const kpiData = [
    {
      title: "Potencial Total",
      value: "R$ 285B",
      change: { value: "+3,2%", trend: "up" },
      icon: <ShoppingCart size={18} />,
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    },
    {
      title: "Gasto Médio Mensal",
      value: "R$ 3.450",
      change: { value: "+2,5%", trend: "up" },
      icon: <CreditCard size={18} />,
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    },
    {
      title: "Crescimento Anual",
      value: "4,8%",
      change: { value: "+0,6%", trend: "up" },
      icon: <TrendingUp size={18} />,
      color: "bg-gradient-to-br from-orange-50 to-orange-100",
    },
    {
      title: "Participação no PIB",
      value: "62%",
      change: { value: "+1,2%", trend: "up" },
      icon: <Percent size={18} />,
      color: "bg-gradient-to-br from-rose-50 to-rose-100",
    },
  ];

  // Dados simulados para os gráficos
  const chartData = {
    demographic: {
      ageGroups: [15, 28, 32, 18, 7],
      genderDistribution: [47, 53],
      educationLevels: [5, 20, 40, 35],
    },
    economic: {
      incomeDistribution: [4, 10, 25, 38, 23],
      monthlyTrend: [48, 52, 55, 53, 58, 62, 65],
      sectors: [28, 25, 22, 15, 10],
    },
    consumption: {
      categories: [30, 15, 20, 10, 25],
      monthlySpending: [1350, 1400, 1450, 1420, 1500, 1550],
      channelPreference: [35, 45, 20],
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Potencial de Consumo</h1>
        <p className="text-gray-600">
          Analise dados de gastos e gráficos por setor.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            color={kpi.color}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartSection
          selectedRegion="Brasil"
          selectedFilters={{ category: "Todos" }}
          chartData={chartData}
        />

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Distribuição de Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="alimentacao" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="alimentacao"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Alimentação
                </TabsTrigger>
                <TabsTrigger
                  value="moradia"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Moradia
                </TabsTrigger>
                <TabsTrigger
                  value="transporte"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Transporte
                </TabsTrigger>
              </TabsList>

              <TabsContent value="alimentacao" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de gastos com alimentação
                </div>
              </TabsContent>

              <TabsContent value="moradia" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de gastos com moradia
                </div>
              </TabsContent>

              <TabsContent value="transporte" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de gastos com transporte
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Additional Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Evolução do Consumo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de evolução do consumo
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Canais de Compra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de canais de compra
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Sazonalidade de Gastos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de sazonalidade de gastos
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
