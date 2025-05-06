"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import { Map, MapPin, Layers, Building, BarChart3 } from "lucide-react";

export default function EspacosPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Espaços</h1>
        <p className="text-gray-600 mb-6">
          Gerencie e analise diferentes espaços geográficos e suas
          características.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Áreas Mapeadas"
          value="1.248"
          change={{ value: "+32", trend: "up" }}
          icon={<Map size={20} />}
          color="bg-gradient-to-br from-emerald-50 to-emerald-100"
        />
        <KpiCard
          title="Pontos de Interesse"
          value="8.547"
          change={{ value: "+124", trend: "up" }}
          icon={<MapPin size={20} />}
          color="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <KpiCard
          title="Camadas Ativas"
          value="18"
          change={{ value: "+3", trend: "up" }}
          icon={<Layers size={20} />}
          color="bg-gradient-to-br from-indigo-50 to-indigo-100"
        />
        <KpiCard
          title="Polígonos Urbanos"
          value="426"
          change={{ value: "+15", trend: "up" }}
          icon={<Building size={20} />}
          color="bg-gradient-to-br from-amber-50 to-amber-100"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSection
          selectedRegion="Áreas Urbanas"
          chartData={{
            demographic: {
              ageGroups: [12, 28, 32, 18, 10],
              genderDistribution: [51, 49],
              educationLevels: [8, 22, 38, 32],
            },
          }}
        />

        {/* Additional Card with Tabs */}
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Distribuição por Tipo de Área
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="urban" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="urban"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Urbana
                </TabsTrigger>
                <TabsTrigger
                  value="suburban"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Suburbana
                </TabsTrigger>
                <TabsTrigger
                  value="rural"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Rural
                </TabsTrigger>
              </TabsList>

              <TabsContent value="urban" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Características</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Densidade Populacional",
                      "Infraestrutura",
                      "Serviços",
                      "Mobilidade",
                      "Verticalização",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{feature}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-emerald-600 h-2.5 rounded-full"
                            style={{ width: `${[92, 88, 85, 78, 72][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[92, 88, 85, 78, 72][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="suburban" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Características</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Densidade Populacional",
                      "Infraestrutura",
                      "Serviços",
                      "Mobilidade",
                      "Verticalização",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{feature}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-emerald-600 h-2.5 rounded-full"
                            style={{ width: `${[65, 72, 68, 58, 45][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[65, 72, 68, 58, 45][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rural" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Características</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Densidade Populacional",
                      "Infraestrutura",
                      "Serviços",
                      "Mobilidade",
                      "Verticalização",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{feature}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-emerald-600 h-2.5 rounded-full"
                            style={{ width: `${[25, 35, 30, 22, 10][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[25, 35, 30, 22, 10][index]}%
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
