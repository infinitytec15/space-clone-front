"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import { Users, Home, TrendingUp, Building2 } from "lucide-react";

export default function CidadesPage() {
  // Dados simulados para os KPIs
  const kpiData = [
    {
      title: "População Total",
      value: "12,5M",
      change: { value: "+2,3%", trend: "up" },
      icon: <Users size={18} />,
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "Densidade Demográfica",
      value: "7.398",
      change: { value: "+1,8%", trend: "up" },
      icon: <Home size={18} />,
      color: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "Crescimento Anual",
      value: "1,2%",
      change: { value: "-0,3%", trend: "down" },
      icon: <TrendingUp size={18} />,
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
    },
    {
      title: "Domicílios",
      value: "4,2M",
      change: { value: "+3,1%", trend: "up" },
      icon: <Building2 size={18} />,
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
  ];

  // Dados simulados para os gráficos
  const chartData = {
    demographic: {
      ageGroups: [18, 22, 25, 20, 15],
      genderDistribution: [51, 49],
      educationLevels: [8, 22, 38, 32],
    },
    economic: {
      incomeDistribution: [6, 12, 28, 36, 18],
      monthlyTrend: [45, 48, 52, 50, 55, 58, 62],
      sectors: [35, 22, 18, 15, 10],
    },
    consumption: {
      categories: [22, 18, 25, 12, 23],
      monthlySpending: [1250, 1300, 1350, 1320, 1400, 1450],
      channelPreference: [42, 38, 20],
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Cidades & Sociodemografia</h1>
        <p className="text-gray-600">
          Visualize indicadores, gráficos e comparações por localização.
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
        <ChartSection selectedRegion="São Paulo" chartData={chartData} />

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Distribuição Populacional por Bairro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="populacao" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 bg-slate-100">
                <TabsTrigger
                  value="populacao"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  População
                </TabsTrigger>
                <TabsTrigger
                  value="renda"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Renda
                </TabsTrigger>
              </TabsList>

              <TabsContent value="populacao" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de população por bairro
                </div>
              </TabsContent>

              <TabsContent value="renda" className="mt-0">
                <div className="h-[220px] w-full flex items-center justify-center text-gray-500">
                  Gráfico de renda por bairro
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
              Pirâmide Etária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de pirâmide etária
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Evolução Populacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de evolução populacional
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Índice de Verticalização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de índice de verticalização
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
