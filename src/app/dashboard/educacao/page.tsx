"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import { GraduationCap, School, BookOpen, Award, Users } from "lucide-react";

export default function EducacaoPage() {
  // Dados simulados para os KPIs
  const kpiData = [
    {
      title: "Instituições de Ensino",
      value: "3.842",
      change: { value: "+124", trend: "up" },
      icon: <School size={18} />,
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "Alunos Matriculados",
      value: "1.2M",
      change: { value: "+3,2%", trend: "up" },
      icon: <Users size={18} />,
      color: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "Índice de Alfabetização",
      value: "94,8%",
      change: { value: "+1,2%", trend: "up" },
      icon: <BookOpen size={18} />,
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
    },
    {
      title: "IDEB Médio",
      value: "5.8",
      change: { value: "+0,3", trend: "up" },
      icon: <Award size={18} />,
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
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
        <h1 className="text-2xl font-bold mb-2">Educação</h1>
        <p className="text-gray-600">
          Visualize e analise dados educacionais por região, incluindo
          instituições, matrículas e indicadores de desempenho.
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
        <ChartSection selectedRegion="Brasil" chartData={chartData} />

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Distribuição por Nível de Ensino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="fundamental" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="fundamental"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Fundamental
                </TabsTrigger>
                <TabsTrigger
                  value="medio"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Médio
                </TabsTrigger>
                <TabsTrigger
                  value="superior"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Superior
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fundamental" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Indicadores</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Taxa de Aprovação",
                      "Taxa de Evasão",
                      "Nota Média",
                      "Professores por Aluno",
                      "Infraestrutura",
                    ].map((indicator, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{indicator}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[85, 12, 72, 65, 58][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[85, 12, 72, 65, 58][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="medio" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Indicadores</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Taxa de Aprovação",
                      "Taxa de Evasão",
                      "Nota Média",
                      "Professores por Aluno",
                      "Infraestrutura",
                    ].map((indicator, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{indicator}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[78, 18, 68, 60, 62][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[78, 18, 68, 60, 62][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="superior" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Indicadores</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Taxa de Conclusão",
                      "Taxa de Evasão",
                      "Conceito MEC",
                      "Professores Doutores",
                      "Infraestrutura",
                    ].map((indicator, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{indicator}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[65, 22, 82, 75, 70][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[65, 22, 82, 75, 70][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
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
              Distribuição de Matrículas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de distribuição de matrículas
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Evolução do IDEB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de evolução do IDEB
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Investimento por Aluno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center text-gray-500">
              Gráfico de investimento por aluno
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
