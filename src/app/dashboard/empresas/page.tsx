"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartSection from "@/components/dashboard/ChartSection";
import {
  Building2,
  TrendingUp,
  Users,
  Briefcase,
  BarChart3,
} from "lucide-react";

export default function EmpresasPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Empresas</h1>
        <p className="text-gray-600 mb-6">
          Visualize e analise dados sobre empresas e atividades econômicas em
          diferentes regiões.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total de Empresas"
          value="24.853"
          change={{ value: "+5.2%", trend: "up" }}
          icon={<Building2 size={20} />}
          color="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <KpiCard
          title="Novas Empresas (2023)"
          value="1.247"
          change={{ value: "+12.8%", trend: "up" }}
          icon={<TrendingUp size={20} />}
          color="bg-gradient-to-br from-green-50 to-green-100"
        />
        <KpiCard
          title="Empregos Gerados"
          value="143.520"
          change={{ value: "+3.5%", trend: "up" }}
          icon={<Users size={20} />}
          color="bg-gradient-to-br from-purple-50 to-purple-100"
        />
        <KpiCard
          title="Setores Ativos"
          value="42"
          change={{ value: "+2", trend: "up" }}
          icon={<Briefcase size={20} />}
          color="bg-gradient-to-br from-amber-50 to-amber-100"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSection
          selectedRegion="Região Metropolitana"
          chartData={{
            economic: {
              incomeDistribution: [8, 22, 35, 25, 10],
              monthlyTrend: [45, 48, 52, 49, 55, 58, 62],
              sectors: [35, 28, 18, 12, 7],
            },
          }}
        />

        {/* Additional Card with Tabs */}
        <Card className="w-full bg-white border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Distribuição por Setor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-slate-100">
                <TabsTrigger
                  value="services"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Serviços
                </TabsTrigger>
                <TabsTrigger
                  value="industry"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Indústria
                </TabsTrigger>
                <TabsTrigger
                  value="commerce"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Comércio
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Principais Segmentos
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Tecnologia",
                      "Saúde",
                      "Educação",
                      "Financeiro",
                      "Consultoria",
                    ].map((segment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{segment}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[75, 68, 62, 55, 48][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[75, 68, 62, 55, 48][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="industry" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Principais Segmentos
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Manufatura",
                      "Construção",
                      "Alimentos",
                      "Têxtil",
                      "Automotivo",
                    ].map((segment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{segment}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[70, 65, 58, 52, 45][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[70, 65, 58, 52, 45][index]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="commerce" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      Principais Segmentos
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Varejo",
                      "Atacado",
                      "E-commerce",
                      "Supermercados",
                      "Vestuário",
                    ].map((segment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{segment}</span>
                        <div className="w-2/3 bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${[80, 72, 65, 58, 50][index]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {[80, 72, 65, 58, 50][index]}%
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
