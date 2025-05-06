"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import { Brain, Sparkles, LineChart, Zap, BarChart3 } from "lucide-react";

export default function SpaceAIPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Space AI</h1>
        <p className="text-gray-600 mb-6">
          Utilize inteligência artificial para análises avançadas e insights
          preditivos sobre dados geoespaciais.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Modelos Ativos"
          value="8"
          change={{ value: "+2", trend: "up" }}
          icon={<Brain size={20} />}
          color="bg-gradient-to-br from-violet-50 to-violet-100"
        />
        <KpiCard
          title="Insights Gerados"
          value="1.247"
          change={{ value: "+215", trend: "up" }}
          icon={<Sparkles size={20} />}
          color="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <KpiCard
          title="Previsões Realizadas"
          value="3.842"
          change={{ value: "+18%", trend: "up" }}
          icon={<LineChart size={20} />}
          color="bg-gradient-to-br from-cyan-50 to-cyan-100"
        />
        <KpiCard
          title="Processamento"
          value="98.5%"
          change={{ value: "+2.5%", trend: "up" }}
          icon={<Zap size={20} />}
          color="bg-gradient-to-br from-amber-50 to-amber-100"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSection
          selectedRegion="Análise Preditiva"
          chartData={{
            consumption: {
              categories: [25, 18, 22, 15, 20],
              monthlySpending: [1250, 1320, 1380, 1420, 1500, 1580],
              channelPreference: [45, 38, 17],
            },
          }}
        />

        {/* Additional Card with Tabs */}
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Modelos de IA por Aplicação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prediction" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="prediction"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Predição
                </TabsTrigger>
                <TabsTrigger
                  value="classification"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Classificação
                </TabsTrigger>
                <TabsTrigger
                  value="clustering"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Clustering
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prediction" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Modelos Preditivos</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Previsão de Demanda",
                      "Tendências de Consumo",
                      "Crescimento Populacional",
                      "Expansão Urbana",
                      "Valorização Imobiliária",
                    ].map((model, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{model}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{ width: `${[92, 85, 78, 72, 68][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[92, 85, 78, 72, 68][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="classification" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Modelos de Classificação
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Segmentação de Clientes",
                      "Categorização de Áreas",
                      "Perfil Socioeconômico",
                      "Potencial de Consumo",
                      "Risco de Crédito",
                    ].map((model, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{model}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{ width: `${[88, 82, 75, 70, 65][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[88, 82, 75, 70, 65][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="clustering" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Modelos de Clustering
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Agrupamento Geográfico",
                      "Padrões de Mobilidade",
                      "Comportamento de Consumo",
                      "Similaridade de Regiões",
                      "Concentração Empresarial",
                    ].map((model, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{model}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{ width: `${[90, 84, 78, 72, 65][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[90, 84, 78, 72, 65][index]}%
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
    </div>
  );
}
