"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import { Car, Map, Clock, TrendingUp, BarChart3 } from "lucide-react";

export default function MobilidadePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mobilidade</h1>
        <p className="text-gray-600 mb-6">
          Analise padrões de mobilidade urbana e fluxos de deslocamento em
          diferentes regiões.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Tempo Médio de Deslocamento"
          value="32 min"
          change={{ value: "-5%", trend: "down" }}
          icon={<Clock size={20} />}
          color="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <KpiCard
          title="Rotas Mapeadas"
          value="1.842"
          change={{ value: "+124", trend: "up" }}
          icon={<Map size={20} />}
          color="bg-gradient-to-br from-teal-50 to-teal-100"
        />
        <KpiCard
          title="Veículos Monitorados"
          value="12.547"
          change={{ value: "+8,2%", trend: "up" }}
          icon={<Car size={20} />}
          color="bg-gradient-to-br from-amber-50 to-amber-100"
        />
        <KpiCard
          title="Eficiência de Rotas"
          value="78,5%"
          change={{ value: "+3,2%", trend: "up" }}
          icon={<TrendingUp size={20} />}
          color="bg-gradient-to-br from-cyan-50 to-cyan-100"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSection
          selectedRegion="Região Metropolitana"
          chartData={{
            demographic: {
              ageGroups: [15, 28, 32, 18, 7],
              genderDistribution: [52, 48],
              educationLevels: [5, 25, 40, 30],
            },
          }}
        />

        {/* Additional Card with Tabs */}
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Distribuição por Modo de Transporte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="publico" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="publico"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Público
                </TabsTrigger>
                <TabsTrigger
                  value="privado"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Privado
                </TabsTrigger>
                <TabsTrigger
                  value="alternativo"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Alternativo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="publico" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Tipos de Transporte</h3>
                  </div>
                  <div className="space-y-3">
                    {["Ônibus", "Metrô", "Trem", "BRT", "VLT"].map(
                      (mode, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{mode}</span>
                          <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${[65, 22, 8, 3, 2][index]}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {[65, 22, 8, 3, 2][index]}%
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privado" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Tipos de Transporte</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Carro Particular",
                      "Táxi/Aplicativo",
                      "Motocicleta",
                      "Carona",
                      "Outros",
                    ].map((mode, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{mode}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[72, 15, 8, 4, 1][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[72, 15, 8, 4, 1][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alternativo" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Tipos de Transporte</h3>
                  </div>
                  <div className="space-y-3">
                    {["Bicicleta", "Patinete", "A pé", "Skate", "Outros"].map(
                      (mode, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{mode}</span>
                          <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${[25, 10, 60, 3, 2][index]}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {[25, 10, 60, 3, 2][index]}%
                          </span>
                        </div>
                      ),
                    )}
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
