"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import MapContainer from "@/components/dashboard/MapContainer";
import { Map, Layers, Activity, Target } from "lucide-react";

export default function AnalyticsPage() {
  // Dados simulados para os KPIs
  const kpiData = [
    {
      title: "Áreas Analisadas",
      value: "1.248",
      change: { value: "+12%", trend: "up" },
      icon: <Map size={18} />,
      color: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    },
    {
      title: "Camadas de Dados",
      value: "32",
      change: { value: "+4", trend: "up" },
      icon: <Layers size={18} />,
      color: "bg-gradient-to-br from-violet-50 to-violet-100",
    },
    {
      title: "Análises Ativas",
      value: "86",
      change: { value: "+15%", trend: "up" },
      icon: <Activity size={18} />,
      color: "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100",
    },
    {
      title: "Precisão",
      value: "94,8%",
      change: { value: "+2,3%", trend: "up" },
      icon: <Target size={18} />,
      color: "bg-gradient-to-br from-sky-50 to-sky-100",
    },
  ];

  // Dados simulados para os gráficos
  const chartData = {
    demographic: {
      ageGroups: [12, 24, 35, 18, 11],
      genderDistribution: [52, 48],
      educationLevels: [7, 25, 38, 30],
    },
    economic: {
      incomeDistribution: [8, 15, 30, 32, 15],
      monthlyTrend: [40, 45, 48, 52, 55, 58, 60],
      sectors: [25, 30, 20, 15, 10],
    },
    consumption: {
      categories: [25, 20, 18, 12, 25],
      monthlySpending: [1200, 1250, 1300, 1280, 1350, 1400],
      channelPreference: [30, 45, 25],
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Análises Espaciais</h1>
        <p className="text-gray-600">
          Ferramentas de desenho e análise geoespacial.
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

      {/* Map Section */}
      <div className="mb-6">
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Mapa de Análise Espacial
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MapContainer />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Distribuição de Pontos de Interesse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comercial" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="comercial"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Comercial
                </TabsTrigger>
                <TabsTrigger
                  value="residencial"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Residencial
                </TabsTrigger>
                <TabsTrigger
                  value="servicos"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Serviços
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comercial" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de pontos comerciais
                </div>
              </TabsContent>

              <TabsContent value="residencial" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de pontos residenciais
                </div>
              </TabsContent>

              <TabsContent value="servicos" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de pontos de serviços
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ChartSection selectedRegion="Área Selecionada" chartData={chartData} />
      </div>

      {/* Additional Tools Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Ferramentas de Desenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Ferramentas para desenho de áreas
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Análise de Isócronas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Visualização de isócronas
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Relatórios Gerados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Lista de relatórios recentes
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
