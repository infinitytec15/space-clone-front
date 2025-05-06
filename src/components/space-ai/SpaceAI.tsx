"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  ThumbsDown,
  History,
  ChevronDown,
  MapPin,
  BarChart3,
  LineChart,
  PieChart,
  Check,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface InsightData {
  title: string;
  description: string;
  recommendation: string;
  score: number;
  chartData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  chartType?: "bar" | "pie";
  feedback?: "useful" | "not_useful" | null;
}

interface HistoryItem {
  id: string;
  city: string;
  neighborhood: string;
  date: string;
  insightCount: number;
}

export default function SpaceAI() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);

  // Mock cities and neighborhoods
  const cities = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Curitiba",
  ];
  const neighborhoods: Record<string, string[]> = {
    "São Paulo": [
      "Pinheiros",
      "Vila Madalena",
      "Moema",
      "Itaim Bibi",
      "Jardins",
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
    Brasília: ["Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Sudoeste"],
    Curitiba: ["Batel", "Água Verde", "Ecoville", "Centro Cívico", "Juvevê"],
  };

  // Function to handle feedback on insights
  const handleFeedback = (
    index: number,
    feedbackType: "useful" | "not_useful",
  ) => {
    const updatedInsights = [...insights];
    updatedInsights[index] = {
      ...updatedInsights[index],
      feedback: feedbackType,
    };
    setInsights(updatedInsights);
  };

  // Function to load history items
  useEffect(() => {
    // Mock history data
    const mockHistory: HistoryItem[] = [
      {
        id: "hist-1",
        city: "São Paulo",
        neighborhood: "Pinheiros",
        date: "2024-06-10 14:30",
        insightCount: 3,
      },
      {
        id: "hist-2",
        city: "Rio de Janeiro",
        neighborhood: "Ipanema",
        date: "2024-06-09 10:15",
        insightCount: 4,
      },
      {
        id: "hist-3",
        city: "Belo Horizonte",
        neighborhood: "Savassi",
        date: "2024-06-08 16:45",
        insightCount: 3,
      },
    ];
    setHistoryItems(mockHistory);
  }, []);

  // Function to load history item
  const loadHistoryItem = (item: HistoryItem) => {
    setSelectedCity(item.city);
    setSelectedNeighborhood(item.neighborhood);
    setHistoryOpen(false);
    generateInsights();
  };

  // Mock function to generate insights
  const generateInsights = () => {
    setIsLoading(true);

    // Add current analysis to history if not loading from history
    if (selectedCity && selectedNeighborhood) {
      const newHistoryItem: HistoryItem = {
        id: `hist-${Date.now()}`,
        city: selectedCity,
        neighborhood: selectedNeighborhood,
        date: new Date().toLocaleString("pt-BR"),
        insightCount: 3,
      };

      // Check if this exact location is already in history
      const existingItemIndex = historyItems.findIndex(
        (item) =>
          item.city === selectedCity &&
          item.neighborhood === selectedNeighborhood,
      );

      if (existingItemIndex === -1) {
        setHistoryItems((prev) => [newHistoryItem, ...prev.slice(0, 4)]);
      }
    }

    // Simulate API call delay
    setTimeout(() => {
      const mockInsights: InsightData[] = [
        {
          title: "Potencial de Consumo",
          description: `${selectedNeighborhood} em ${selectedCity} apresenta alto potencial de consumo em categorias de luxo e serviços premium.`,
          recommendation:
            "Considere investimentos em lojas de vestuário de alto padrão ou serviços de bem-estar.",
          score: 85,
          chartType: "bar",
          chartData: {
            labels: ["Luxo", "Premium", "Casual", "Econômico"],
            datasets: [
              {
                label: "Potencial de Consumo por Categoria",
                data: [85, 72, 45, 30],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                ],
              },
            ],
          },
          feedback: null,
        },
        {
          title: "Perfil Demográfico",
          description: `A região possui predominância de moradores entre 30-45 anos com alto poder aquisitivo e formação superior.`,
          recommendation:
            "Negócios voltados para profissionais estabelecidos tendem a ter boa aceitação.",
          score: 78,
          chartType: "pie",
          chartData: {
            labels: ["18-29 anos", "30-45 anos", "46-60 anos", "60+ anos"],
            datasets: [
              {
                label: "Distribuição Etária",
                data: [25, 45, 20, 10],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          feedback: null,
        },
        {
          title: "Tendência de Crescimento",
          description: `Nos últimos 3 anos, a região apresentou crescimento constante em novos empreendimentos comerciais.`,
          recommendation:
            "O momento é favorável para estabelecer presença na região antes da saturação do mercado.",
          score: 92,
          chartType: "bar",
          chartData: {
            labels: ["2021", "2022", "2023", "2024 (proj.)"],
            datasets: [
              {
                label: "Novos Empreendimentos",
                data: [12, 19, 25, 32],
                backgroundColor: [
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                ],
              },
            ],
          },
          feedback: null,
        },
      ];

      setInsights(mockInsights);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-background p-3 sm:p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Space AI - Insights Automatizados
            </CardTitle>
            <CardDescription>
              Selecione uma localização para receber insights e recomendações de
              negócios baseados em dados geoespaciais e socioeconômicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <label className="text-sm font-medium mb-2 block">Cidade</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-1/3">
                <label className="text-sm font-medium mb-2 block">Bairro</label>
                <Select
                  value={selectedNeighborhood}
                  onValueChange={setSelectedNeighborhood}
                  disabled={!selectedCity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um bairro" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCity &&
                      neighborhoods[selectedCity]?.map((neighborhood) => (
                        <SelectItem key={neighborhood} value={neighborhood}>
                          {neighborhood}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-1/3 flex items-end">
                <Button
                  className="w-full"
                  onClick={generateInsights}
                  disabled={!selectedCity || !selectedNeighborhood || isLoading}
                >
                  {isLoading ? "Gerando insights..." : "Gerar Insights"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {insights.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">
                  Insights da Região
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedNeighborhood}, {selectedCity}
                  </div>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu open={historyOpen} onOpenChange={setHistoryOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-1" />
                      Histórico
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[280px]">
                    {historyItems.length > 0 ? (
                      historyItems.map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          className="flex flex-col items-start p-3 cursor-pointer hover:bg-accent"
                          onClick={() => loadHistoryItem(item)}
                        >
                          <div className="flex justify-between w-full">
                            <span className="font-medium">
                              {item.neighborhood}
                            </span>
                            <Badge variant="outline" className="ml-2">
                              {item.insightCount} insights
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.city} • {item.date}
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-3 text-center text-muted-foreground">
                        Nenhum histórico disponível
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <Card
                    key={index}
                    className="border-l-4"
                    style={{
                      borderLeftColor: `hsl(${insight.score}, 70%, 50%)`,
                    }}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {insight.title}
                        </CardTitle>
                        <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                          Score: {insight.score}/100
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{insight.description}</p>
                      <div className="bg-muted p-3 rounded-md mb-4">
                        <p className="font-medium">Recomendação:</p>
                        <p>{insight.recommendation}</p>
                      </div>

                      {insight.chartData && insight.chartType && (
                        <div className="mt-4 mb-4 h-64">
                          <div className="flex items-center mb-2">
                            {insight.chartType === "bar" ? (
                              <BarChart3 className="h-4 w-4 mr-1" />
                            ) : insight.chartType === "pie" ? (
                              <PieChart className="h-4 w-4 mr-1" />
                            ) : (
                              <LineChart className="h-4 w-4 mr-1" />
                            )}
                            <span className="font-medium">
                              Visualização de Dados:
                            </span>
                          </div>
                          <div className="h-56">
                            {insight.chartType === "bar" && (
                              <Bar
                                data={insight.chartData}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  plugins: {
                                    legend: {
                                      position: "top" as const,
                                    },
                                  },
                                }}
                              />
                            )}
                            {insight.chartType === "pie" && (
                              <Pie
                                data={insight.chartData}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  plugins: {
                                    legend: {
                                      position: "right" as const,
                                    },
                                  },
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end mt-4 space-x-2">
                        {insight.feedback ? (
                          <div className="flex items-center">
                            {insight.feedback === "useful" ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                Marcado como útil
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center">
                                <X className="h-3 w-3 mr-1" />
                                Marcado como não útil
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFeedback(index, "useful")}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Útil
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleFeedback(index, "not_useful")
                              }
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Não útil
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
