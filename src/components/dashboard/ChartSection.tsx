"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  LineChart,
  PieChart,
  MapPin,
  AlertTriangle,
  Users,
  TrendingUp,
} from "lucide-react";

interface ChartSectionProps {
  selectedRegion?: string;
  selectedFilters?: {
    city?: string;
    neighborhood?: string;
    category?: string;
    activity?: string;
    cnae?: string[];
    faturamento?: string;
    funcionarios?: string;
  };
  chartData?: {
    demographic?: {
      ageGroups?: number[];
      genderDistribution?: number[];
      educationLevels?: number[];
    };
    economic?: {
      incomeDistribution?: number[];
      monthlyTrend?: number[];
      sectors?: number[];
    };
    consumption?: {
      categories?: number[];
      monthlySpending?: number[];
      channelPreference?: number[];
    };
    violence?: {
      crimeTypes?: number[];
      monthlyIncidents?: number[];
      safetyIndex?: number;
    };
  };
}

interface LocationOption {
  value: string;
  label: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  selectedRegion = "Região Padrão",
  selectedFilters = {
    city: "São Paulo",
    neighborhood: "Todos",
    category: "Todos",
    activity: "Todos",
    cnae: [],
    faturamento: "todos",
    funcionarios: "todos",
  },
  chartData = {
    demographic: {
      ageGroups: [10, 20, 30, 25, 15],
      genderDistribution: [50, 50],
      educationLevels: [10, 30, 40, 20],
    },
    economic: {
      incomeDistribution: [10, 20, 30, 25, 15],
      monthlyTrend: [40, 45, 50, 55, 60, 65],
      sectors: [30, 25, 20, 15, 10],
    },
    consumption: {
      categories: [20, 25, 15, 20, 20],
      monthlySpending: [1200, 1250, 1300, 1350, 1400, 1450],
      channelPreference: [40, 35, 25],
    },
    violence: {
      crimeTypes: [15, 25, 10, 30, 20],
      monthlyIncidents: [45, 40, 38, 42, 50, 48],
      safetyIndex: 65,
    },
  },
}) => {
  // Estado local para cidade e bairro selecionados
  const [selectedCity, setSelectedCity] = useState<string>(
    selectedFilters.city || "São Paulo",
  );
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(
    selectedFilters.neighborhood || "Todos",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("demographic");

  // Opções de cidades e bairros (simuladas)
  const cityOptions: LocationOption[] = [
    { value: "São Paulo", label: "São Paulo" },
    { value: "Rio de Janeiro", label: "Rio de Janeiro" },
    { value: "Belo Horizonte", label: "Belo Horizonte" },
    { value: "Salvador", label: "Salvador" },
    { value: "Brasília", label: "Brasília" },
  ];

  const neighborhoodOptions: Record<string, LocationOption[]> = {
    "São Paulo": [
      { value: "Todos", label: "Todos" },
      { value: "Pinheiros", label: "Pinheiros" },
      { value: "Vila Madalena", label: "Vila Madalena" },
      { value: "Moema", label: "Moema" },
      { value: "Itaim Bibi", label: "Itaim Bibi" },
    ],
    "Rio de Janeiro": [
      { value: "Todos", label: "Todos" },
      { value: "Copacabana", label: "Copacabana" },
      { value: "Ipanema", label: "Ipanema" },
      { value: "Leblon", label: "Leblon" },
      { value: "Barra da Tijuca", label: "Barra da Tijuca" },
    ],
    "Belo Horizonte": [
      { value: "Todos", label: "Todos" },
      { value: "Savassi", label: "Savassi" },
      { value: "Lourdes", label: "Lourdes" },
      { value: "Funcionários", label: "Funcionários" },
    ],
    Salvador: [
      { value: "Todos", label: "Todos" },
      { value: "Barra", label: "Barra" },
      { value: "Rio Vermelho", label: "Rio Vermelho" },
      { value: "Pituba", label: "Pituba" },
    ],
    Brasília: [
      { value: "Todos", label: "Todos" },
      { value: "Asa Sul", label: "Asa Sul" },
      { value: "Asa Norte", label: "Asa Norte" },
      { value: "Lago Sul", label: "Lago Sul" },
    ],
  };

  // Função para buscar dados com base na cidade e bairro selecionados
  const fetchData = async (city: string, neighborhood: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulação de chamada de API - em um cenário real, isso seria uma chamada fetch
      await new Promise((resolve, reject) => {
        // Simulação de erro aleatório (10% de chance)
        const shouldFail = Math.random() < 0.1;
        if (shouldFail) {
          setTimeout(
            () => reject(new Error("Falha na conexão com o servidor")),
            800,
          );
        } else {
          setTimeout(resolve, 800);
        }
      });

      // Aqui você faria a chamada real para sua API
      // const response = await fetch(`/api/data?city=${city}&neighborhood=${neighborhood}`);
      // if (!response.ok) {
      //   throw new Error(`Erro ${response.status}: ${response.statusText}`);
      // }
      // const data = await response.json();

      // Por enquanto, apenas simulamos dados diferentes para cada cidade
      console.log(`Dados carregados para ${city}, ${neighborhood}`);

      // Em um cenário real, você atualizaria o estado com os dados recebidos
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao carregar dados",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para buscar dados quando a cidade ou bairro mudar
  useEffect(() => {
    fetchData(selectedCity, selectedNeighborhood);
  }, [selectedCity, selectedNeighborhood]);

  // Safe access to chart data with fallbacks
  const demographic = chartData?.demographic || {};
  const economic = chartData?.economic || {};
  const consumption = chartData?.consumption || {};
  const violence = chartData?.violence || {};

  // Prepare data for bar chart
  const prepareBarChartData = () => {
    const ageGroups = demographic?.ageGroups || [10, 20, 30, 25, 15];
    const labels = ["0-18", "19-30", "31-45", "46-60", "60+"];

    return {
      labels,
      data: ageGroups,
    };
  };

  // Prepare data for line chart
  const prepareLineChartData = () => {
    const monthlyTrend = economic?.monthlyTrend || [40, 45, 50, 55, 60, 65];
    const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

    return {
      labels,
      data: monthlyTrend,
    };
  };

  // Prepare data for pie chart
  const preparePieChartData = () => {
    const channelPreference = consumption?.channelPreference || [40, 35, 25];
    const labels = ["Online", "Físico", "Híbrido"];

    return {
      labels,
      data: channelPreference,
    };
  };

  // Prepare data for violence chart
  const prepareViolenceChartData = () => {
    const crimeTypes = violence?.crimeTypes || [15, 25, 10, 30, 20];
    const labels = ["Furto", "Roubo", "Agressão", "Vandalismo", "Outros"];

    return {
      labels,
      data: crimeTypes,
    };
  };

  const barChartData = prepareBarChartData();
  const lineChartData = prepareLineChartData();
  const pieChartData = preparePieChartData();
  const violenceChartData = prepareViolenceChartData();

  return (
    <Card className="w-full bg-white border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-medium">
            Análise de Dados: {selectedRegion}
          </CardTitle>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {/* Seletor de Cidade */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedNeighborhood("Todos");
                }}
                className="text-sm border rounded px-2 py-1 bg-white"
              >
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Seletor de Bairro */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-white"
              >
                {neighborhoodOptions[selectedCity]?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-blue-600 font-medium">
                Carregando dados...
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center max-w-md">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="text-red-500 font-medium">
                Erro ao carregar dados
              </div>
              <p className="text-sm text-gray-600">{error}</p>
              <button
                onClick={() => fetchData(selectedCity, selectedNeighborhood)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-4 bg-slate-100 relative">
              <TabsTrigger
                value="demographic"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Demográfico
              </TabsTrigger>
              <TabsTrigger
                value="economic"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Econômico
              </TabsTrigger>
              <TabsTrigger
                value="consumption"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <PieChart className="h-4 w-4 mr-2" />
                Consumo
              </TabsTrigger>
              <TabsTrigger
                value="violence"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Violência
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demographic" className="mt-0 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Distribuição por Idade */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Distribuição por Idade
                    </h3>
                    <div className="flex items-end h-[150px] gap-2">
                      {barChartData.data.map((value, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-full bg-blue-500 rounded-t"
                            style={{
                              height: `${(value / Math.max(...barChartData.data)) * 120}px`,
                            }}
                          ></div>
                          <span className="text-xs mt-1">
                            {barChartData.labels[index]}
                          </span>
                          <span className="text-xs font-medium">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Distribuição por Gênero */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Distribuição por Gênero
                    </h3>
                    <div className="flex justify-center items-center gap-8">
                      <div className="relative w-[150px] h-[150px]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {(() => {
                            const genderData =
                              demographic?.genderDistribution || [50, 50];
                            const colors = ["#3b82f6", "#ec4899"];
                            const labels = ["Masculino", "Feminino"];
                            let total = 0;
                            const paths = [];

                            for (let i = 0; i < genderData.length; i++) {
                              const startAngle = total;
                              const endAngle =
                                startAngle + (genderData[i] / 100) * 360;
                              const x1 =
                                50 +
                                40 * Math.cos((startAngle * Math.PI) / 180);
                              const y1 =
                                50 +
                                40 * Math.sin((startAngle * Math.PI) / 180);
                              const x2 =
                                50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                              const y2 =
                                50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                              const largeArcFlag =
                                endAngle - startAngle > 180 ? 1 : 0;

                              paths.push(
                                <path
                                  key={i}
                                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                  fill={colors[i % colors.length]}
                                />,
                              );
                              total = endAngle;
                            }
                            return paths;
                          })()}
                        </svg>
                      </div>
                      <div className="space-y-2">
                        {["Masculino", "Feminino"].map((label, index) => {
                          const genderData =
                            demographic?.genderDistribution || [50, 50];
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    index === 0 ? "#3b82f6" : "#ec4899",
                                }}
                              ></div>
                              <span className="text-xs">
                                {label}: {genderData[index]}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Níveis de Educação */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Níveis de Educação
                    </h3>
                    <div className="flex items-end h-[150px] gap-2">
                      {(() => {
                        const educationData = demographic?.educationLevels || [
                          10, 30, 40, 20,
                        ];
                        const labels = [
                          "Fundamental",
                          "Médio",
                          "Superior",
                          "Pós-graduação",
                        ];
                        return educationData.map((value, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                          >
                            <div
                              className="w-full bg-indigo-500 rounded-t"
                              style={{
                                height: `${(value / Math.max(...educationData)) * 120}px`,
                              }}
                            ></div>
                            <span className="text-xs mt-1">
                              {labels[index]}
                            </span>
                            <span className="text-xs font-medium">
                              {value}%
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Indicadores Demográficos */}
                <div className="h-[200px] p-4 border rounded-md bg-slate-50">
                  <h3 className="text-sm font-medium mb-4">
                    Indicadores Demográficos
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Idade Média</span>
                        <span className="font-medium">35 anos</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Densidade Populacional</span>
                        <span className="font-medium">4.200/km²</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Taxa de Natalidade</span>
                        <span className="font-medium">14,3/1000</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: "14.3%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Expectativa de Vida</span>
                        <span className="font-medium">76,8 anos</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: "76.8%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="economic" className="mt-0 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tendência Mensal */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Tendência Mensal
                    </h3>
                    <div className="relative h-[150px] w-full">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 300 100"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          points={lineChartData.data
                            .map((value, index) => {
                              const x =
                                (index / (lineChartData.data.length - 1)) * 300;
                              const y =
                                100 -
                                ((value - Math.min(...lineChartData.data)) /
                                  (Math.max(...lineChartData.data) -
                                    Math.min(...lineChartData.data))) *
                                  80;
                              return `${x},${y}`;
                            })
                            .join(" ")}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        {lineChartData.data.map((value, index) => {
                          const x =
                            (index / (lineChartData.data.length - 1)) * 300;
                          const y =
                            100 -
                            ((value - Math.min(...lineChartData.data)) /
                              (Math.max(...lineChartData.data) -
                                Math.min(...lineChartData.data))) *
                              80;
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="3"
                              fill="#3b82f6"
                            />
                          );
                        })}
                      </svg>
                      <div className="flex justify-between mt-2">
                        {lineChartData.labels.map((label, index) => (
                          <span key={index} className="text-xs">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribuição de Renda */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Distribuição de Renda
                    </h3>
                    <div className="flex items-end h-[150px] gap-2">
                      {(() => {
                        const incomeData = economic?.incomeDistribution || [
                          10, 20, 30, 25, 15,
                        ];
                        const labels = [
                          "Classe E",
                          "Classe D",
                          "Classe C",
                          "Classe B",
                          "Classe A",
                        ];
                        return incomeData.map((value, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                          >
                            <div
                              className="w-full bg-green-500 rounded-t"
                              style={{
                                height: `${(value / Math.max(...incomeData)) * 120}px`,
                              }}
                            ></div>
                            <span className="text-xs mt-1">
                              {labels[index]}
                            </span>
                            <span className="text-xs font-medium">
                              {value}%
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Setores Econômicos */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Setores Econômicos
                    </h3>
                    <div className="flex items-end h-[150px] gap-2">
                      {(() => {
                        const sectorsData = economic?.sectors || [
                          30, 25, 20, 15, 10,
                        ];
                        const labels = [
                          "Serviços",
                          "Comércio",
                          "Indústria",
                          "Tecnologia",
                          "Outros",
                        ];
                        const colors = [
                          "#3b82f6",
                          "#10b981",
                          "#f59e0b",
                          "#8b5cf6",
                          "#ec4899",
                        ];
                        return sectorsData.map((value, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                          >
                            <div
                              className="w-full rounded-t"
                              style={{
                                height: `${(value / Math.max(...sectorsData)) * 120}px`,
                                backgroundColor: colors[index % colors.length],
                              }}
                            ></div>
                            <span className="text-xs mt-1">
                              {labels[index]}
                            </span>
                            <span className="text-xs font-medium">
                              {value}%
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Indicadores Econômicos */}
                <div className="h-[200px] p-4 border rounded-md bg-slate-50">
                  <h3 className="text-sm font-medium mb-4">
                    Indicadores Econômicos
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>PIB per Capita</span>
                        <span className="font-medium">R$ 42.500</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Taxa de Desemprego</span>
                        <span className="font-medium">7.2%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{ width: "7.2%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Crescimento Econômico</span>
                        <span className="font-medium">2.8%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Índice de Gini</span>
                        <span className="font-medium">0.52</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-orange-500 rounded-full"
                          style={{ width: "52%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="consumption" className="mt-0 relative">
              <div className="h-[200px] flex items-center justify-center">
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">
                    Preferência de Canal
                  </h3>
                  <div className="flex justify-center items-center gap-8">
                    <div className="relative w-[150px] h-[150px]">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {
                          pieChartData.data.reduce(
                            (acc, value, index) => {
                              const startAngle = acc.total;
                              const endAngle = startAngle + (value / 100) * 360;
                              const x1 =
                                50 +
                                40 * Math.cos((startAngle * Math.PI) / 180);
                              const y1 =
                                50 +
                                40 * Math.sin((startAngle * Math.PI) / 180);
                              const x2 =
                                50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                              const y2 =
                                50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                              const largeArcFlag =
                                endAngle - startAngle > 180 ? 1 : 0;

                              const colors = ["#3b82f6", "#10b981", "#f59e0b"];

                              acc.paths.push(
                                <path
                                  key={index}
                                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                  fill={colors[index % colors.length]}
                                />,
                              );
                              acc.total = endAngle;
                              return acc;
                            },
                            { paths: [], total: 0 },
                          ).paths
                        }
                      </svg>
                    </div>
                    <div className="space-y-2">
                      {pieChartData.labels.map((label, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: [
                                "#3b82f6",
                                "#10b981",
                                "#f59e0b",
                              ][index % 3],
                            }}
                          ></div>
                          <span className="text-xs">
                            {label}: {pieChartData.data[index]}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="violence" className="mt-0 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Índice de Criminalidade */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Índice de Criminalidade
                    </h3>
                    <div className="flex items-end h-[150px] gap-2">
                      {violenceChartData.data.map((value, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-full bg-red-500 rounded-t"
                            style={{
                              height: `${(value / Math.max(...violenceChartData.data)) * 120}px`,
                            }}
                          ></div>
                          <span className="text-xs mt-1">
                            {violenceChartData.labels[index]}
                          </span>
                          <span className="text-xs font-medium">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Incidentes Mensais */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Incidentes Mensais
                    </h3>
                    <div className="relative h-[150px] w-full">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 300 100"
                        preserveAspectRatio="none"
                      >
                        {(() => {
                          const monthlyIncidents =
                            violence?.monthlyIncidents || [
                              45, 40, 38, 42, 50, 48,
                            ];
                          const labels = [
                            "Jan",
                            "Fev",
                            "Mar",
                            "Abr",
                            "Mai",
                            "Jun",
                          ];

                          // Draw the line
                          const points = monthlyIncidents
                            .map((value, index) => {
                              const x =
                                (index / (monthlyIncidents.length - 1)) * 300;
                              const y =
                                100 -
                                ((value - Math.min(...monthlyIncidents)) /
                                  (Math.max(...monthlyIncidents) -
                                    Math.min(...monthlyIncidents))) *
                                  80;
                              return `${x},${y}`;
                            })
                            .join(" ");

                          return (
                            <>
                              <polyline
                                points={points}
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                              />
                              {monthlyIncidents.map((value, index) => {
                                const x =
                                  (index / (monthlyIncidents.length - 1)) * 300;
                                const y =
                                  100 -
                                  ((value - Math.min(...monthlyIncidents)) /
                                    (Math.max(...monthlyIncidents) -
                                      Math.min(...monthlyIncidents))) *
                                    80;
                                return (
                                  <circle
                                    key={index}
                                    cx={x}
                                    cy={y}
                                    r="3"
                                    fill="#ef4444"
                                  />
                                );
                              })}
                            </>
                          );
                        })()}
                      </svg>
                      <div className="flex justify-between mt-2">
                        {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map(
                          (label, index) => (
                            <span key={index} className="text-xs">
                              {label}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Índice de Segurança */}
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">
                      Índice de Segurança
                    </h3>
                    <div className="flex flex-col items-center justify-center h-[150px]">
                      <div className="relative w-[150px] h-[150px]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={
                              violence?.safetyIndex && violence.safetyIndex > 70
                                ? "#10b981"
                                : violence?.safetyIndex &&
                                    violence.safetyIndex > 40
                                  ? "#f59e0b"
                                  : "#ef4444"
                            }
                            strokeWidth="10"
                            strokeDasharray="282.7"
                            strokeDashoffset={
                              282.7 * (1 - (violence?.safetyIndex || 65) / 100)
                            }
                            transform="rotate(-90 50 50)"
                          />
                          <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="20"
                            fontWeight="bold"
                            fill={
                              violence?.safetyIndex && violence.safetyIndex > 70
                                ? "#10b981"
                                : violence?.safetyIndex &&
                                    violence.safetyIndex > 40
                                  ? "#f59e0b"
                                  : "#ef4444"
                            }
                          >
                            {violence?.safetyIndex || 65}%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicadores de Segurança */}
                <div className="h-[200px] p-4 border rounded-md bg-slate-50">
                  <h3 className="text-sm font-medium mb-4">
                    Indicadores de Segurança
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Crimes por 100k habitantes</span>
                        <span className="font-medium">42.3</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full"
                          style={{ width: "42.3%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Presença Policial</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Iluminação Pública</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{ width: "76%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Percepção de Segurança</span>
                        <span className="font-medium">58%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-orange-500 rounded-full"
                          style={{ width: "58%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartSection;
