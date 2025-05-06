"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Home, Filter, Download, BarChart } from "lucide-react";
import Link from "next/link";
import SociodemografiaKpiCards from "@/components/cidades-sociodemografia/KpiCards";
import AgePyramidChart from "@/components/cidades-sociodemografia/AgePyramidChart";
import PopulationEvolutionChart from "@/components/cidades-sociodemografia/PopulationEvolutionChart";
import VerticalizationChart from "@/components/cidades-sociodemografia/VerticalizationChart";

export default function CidadesSociodemografia() {
  // Estados para os filtros
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [setorCensitario, setSetorCensitario] = useState("");
  const [loading, setLoading] = useState(false);
  const [kpiData, setKpiData] = useState(null);
  const [chartData, setChartData] = useState({
    agePyramid: null,
    populationEvolution: null,
    verticalization: null,
  });
  const [showSidePanel, setShowSidePanel] = useState(false);

  // Dados de exemplo para as opções de filtro
  const estados = ["SP", "RJ", "MG", "RS", "PR", "SC", "BA"];

  const cidadesPorEstado = {
    SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
    RJ: ["Rio de Janeiro", "Niterói", "Petrópolis", "Angra dos Reis"],
    MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Ouro Preto"],
    RS: ["Porto Alegre", "Gramado", "Caxias do Sul", "Pelotas"],
    PR: ["Curitiba", "Londrina", "Maringá", "Foz do Iguaçu"],
    SC: ["Florianópolis", "Joinville", "Blumenau", "Balneário Camboriú"],
    BA: ["Salvador", "Porto Seguro", "Ilhéus", "Feira de Santana"],
  };

  const bairrosPorCidade = {
    "São Paulo": [
      "Jardins",
      "Pinheiros",
      "Vila Madalena",
      "Moema",
      "Itaim Bibi",
    ],
    "Rio de Janeiro": [
      "Copacabana",
      "Ipanema",
      "Leblon",
      "Barra da Tijuca",
      "Botafogo",
    ],
    "Belo Horizonte": [
      "Savassi",
      "Lourdes",
      "Funcionários",
      "Buritis",
      "Belvedere",
    ],
    // Outros bairros seriam adicionados aqui
  };

  // Atualiza as opções de cidade quando o estado muda
  useEffect(() => {
    if (estado) {
      setCidade("");
      setBairro("");
      setSetorCensitario("");
    }
  }, [estado]);

  // Atualiza as opções de bairro quando a cidade muda
  useEffect(() => {
    if (cidade) {
      setBairro("");
      setSetorCensitario("");
    }
  }, [cidade]);

  // Função para aplicar os filtros
  const aplicarFiltros = () => {
    setLoading(true);

    // Simulação de chamada de API
    setTimeout(() => {
      // Dados simulados que seriam retornados pela API
      const dadosSimulados = {
        totalPopulation: {
          value:
            estado === "SP" ? "45.9M" : estado === "RJ" ? "17.3M" : "21.2M",
          change: { value: "2.5% vs. ano anterior", trend: "up" },
        },
        ageGroups: {
          value: "Jovens: 25%, Adultos: 55%, Idosos: 20%",
          change: { value: "Envelhecimento +1.8%", trend: "neutral" },
        },
        averageIncome: {
          value:
            cidade === "São Paulo"
              ? "R$ 5.120"
              : cidade === "Rio de Janeiro"
                ? "R$ 4.890"
                : "R$ 4.250",
          change: { value: "4.2% vs. ano anterior", trend: "up" },
        },
        socialClasses: {
          value: "A: 7%, B: 23%, C: 48%, D/E: 22%",
          change: { value: "Mobilidade +1.2%", trend: "up" },
        },
        educationIndex: {
          value: bairro ? "0.78" : "0.72",
          change: { value: "3% vs. ano anterior", trend: "up" },
        },
      };

      // Dados simulados para os gráficos
      const chartDataSimulado = {
        agePyramid: {
          maleData: [5, 8, 12, 15, 18, 14, 10, 7, 4],
          femaleData: [-5, -9, -13, -16, -19, -15, -12, -9, -6],
          ageGroups: [
            "0-9",
            "10-19",
            "20-29",
            "30-39",
            "40-49",
            "50-59",
            "60-69",
            "70-79",
            "80+",
          ],
        },
        populationEvolution: {
          years: ["2010", "2012", "2014", "2016", "2018", "2020", "2022"],
          population:
            estado === "SP"
              ? [
                  41000000, 42500000, 43800000, 44700000, 45300000, 45600000,
                  45900000,
                ]
              : [
                  15000000, 15500000, 16000000, 16300000, 16700000, 17000000,
                  17300000,
                ],
          growthRate: [null, 3.7, 3.1, 2.1, 1.3, 0.7, 0.6],
        },
        verticalization: {
          regions:
            cidade === "São Paulo"
              ? ["Centro", "Zona Norte", "Zona Sul", "Zona Oeste", "Zona Leste"]
              : ["Centro", "Zona Norte", "Zona Sul", "Zona Oeste", "Baixada"],
          apartmentPercentage:
            cidade === "São Paulo"
              ? [78, 45, 68, 52, 35]
              : [65, 40, 72, 48, 30],
          housePercentage:
            cidade === "São Paulo"
              ? [22, 55, 32, 48, 65]
              : [35, 60, 28, 52, 70],
        },
      };

      setKpiData(dadosSimulados);
      setChartData(chartDataSimulado);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">SD</span>
          </div>
          <h1 className="text-xl font-bold">Space Data</h1>
        </div>
      </header>

      {/* Breadcrumb and Title */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-7xl mx-auto">
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Link href="/" className="hover:text-primary flex items-center">
                <Home className="h-3.5 w-3.5 mr-1" />
                <span>Home</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 mx-1" />
              <span className="text-foreground">Cidades & Sociodemografia</span>
            </div>
            <h1 className="text-2xl font-bold">Cidades & Sociodemografia</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter Section */}
        <Card className="mb-6 bg-white dark:bg-gray-900">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </h2>
              <Button
                onClick={aplicarFiltros}
                disabled={loading}
                className="mt-2 sm:mt-0"
              >
                {loading ? "Carregando..." : "Aplicar Filtros"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Selecione um estado</option>
                  {estados.map((est) => (
                    <option key={est} value={est}>
                      {est}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cidade</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  disabled={!estado}
                >
                  <option value="">Selecione uma cidade</option>
                  {estado &&
                    cidadesPorEstado[estado]?.map((cid) => (
                      <option key={cid} value={cid}>
                        {cid}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bairro</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  disabled={!cidade}
                >
                  <option value="">Selecione um bairro</option>
                  {cidade &&
                    bairrosPorCidade[cidade]?.map((bai) => (
                      <option key={bai} value={bai}>
                        {bai}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Setor Censitário</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={setorCensitario}
                  onChange={(e) => setSetorCensitario(e.target.value)}
                  disabled={!bairro}
                >
                  <option value="">Selecione um setor</option>
                  {/* Setores seriam carregados dinamicamente */}
                  <option value="setor1">Setor 001</option>
                  <option value="setor2">Setor 002</option>
                  <option value="setor3">Setor 003</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards Section */}
        {kpiData ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Indicadores Sociodemográficos
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowSidePanel(!showSidePanel)}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                {showSidePanel ? "Ocultar Painel" : "Exportar Dados"}
              </Button>
            </div>

            <SociodemografiaKpiCards data={kpiData} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <AgePyramidChart data={chartData.agePyramid} loading={loading} />
              <PopulationEvolutionChart
                data={chartData.populationEvolution}
                loading={loading}
              />
              <div className="lg:col-span-2">
                <VerticalizationChart
                  data={chartData.verticalization}
                  loading={loading}
                />
              </div>
            </div>

            {/* Side Panel for Data Export */}
            {showSidePanel && (
              <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg border-l p-4 z-20 overflow-y-auto transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Exportar Dados</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSidePanel(false)}
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">Dados Demográficos</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" /> Baixar CSV
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">Pirâmide Etária</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2 mb-2"
                    >
                      <Download className="h-4 w-4" /> Baixar PNG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" /> Baixar CSV
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">Evolução Populacional</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2 mb-2"
                    >
                      <Download className="h-4 w-4" /> Baixar PNG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" /> Baixar CSV
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">Verticalização</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2 mb-2"
                    >
                      <Download className="h-4 w-4" /> Baixar PNG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" /> Baixar CSV
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border shadow-sm">
            <p className="text-muted-foreground">
              Selecione os filtros e clique em "Aplicar Filtros" para visualizar
              os dados sociodemográficos.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
