"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Home,
  Filter,
  Download,
  ShoppingCart,
  PieChart,
} from "lucide-react";
import Link from "next/link";
import ConsumptionBarChart from "@/components/potencial-consumo/ConsumptionBarChart";
import ConsumptionPieChart from "@/components/potencial-consumo/ConsumptionPieChart";
import ConsumptionLineChart from "@/components/potencial-consumo/ConsumptionLineChart";
import ConsumptionDataTable from "@/components/potencial-consumo/ConsumptionDataTable";

export default function PotencialConsumo() {
  // Estados para os filtros
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [categoriaConsumo, setCategoriaConsumo] = useState("");
  const [classeSocial, setClasseSocial] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState("");
  const [loading, setLoading] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);

  // Estados para os dados dos gráficos e tabela
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [tableData, setTableData] = useState(null);

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
  };

  const categoriasConsumo = [
    "Alimentação",
    "Higiene Pessoal",
    "Vestuário",
    "Eletrônicos",
    "Lazer",
    "Saúde",
    "Educação",
    "Transporte",
    "Moradia",
  ];

  const classesSociais = ["A", "B1", "B2", "C1", "C2", "D/E"];

  const faixasEtarias = [
    "0-14 anos",
    "15-24 anos",
    "25-34 anos",
    "35-44 anos",
    "45-59 anos",
    "60+ anos",
  ];

  // Atualiza as opções de cidade quando o estado muda
  useEffect(() => {
    if (estado) {
      setCidade("");
      setBairro("");
    }
  }, [estado]);

  // Atualiza as opções de bairro quando a cidade muda
  useEffect(() => {
    if (cidade) {
      setBairro("");
    }
  }, [cidade]);

  // Função para aplicar os filtros
  const aplicarFiltros = () => {
    setLoading(true);

    // Simulação de chamada de API
    setTimeout(() => {
      // Gerar dados simulados para os gráficos e tabela
      gerarDadosSimulados();
      setDadosCarregados(true);
      setLoading(false);
    }, 800);
  };

  // Função para gerar dados simulados para os gráficos e tabela
  const gerarDadosSimulados = () => {
    // Dados para o gráfico de barras
    const bairrosDisponiveis = bairro
      ? [bairro]
      : cidade && bairrosPorCidade[cidade]
        ? bairrosPorCidade[cidade]
        : ["Jardins", "Pinheiros", "Vila Madalena", "Moema", "Itaim Bibi"];

    setBarChartData({
      labels: bairrosDisponiveis.slice(0, 5),
      values: bairrosDisponiveis.map(
        () => Math.floor(Math.random() * 500) + 100,
      ),
    });

    // Dados para o gráfico de pizza
    const categoriasDisponiveis = categoriaConsumo
      ? [categoriaConsumo]
      : categoriasConsumo;
    setPieChartData({
      labels: categoriasDisponiveis.slice(0, 5),
      values: categoriasDisponiveis
        .slice(0, 5)
        .map(() => Math.floor(Math.random() * 100) + 20),
    });

    // Dados para o gráfico de linha
    setLineChartData({
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      datasets: [
        {
          label: "2023",
          values: Array(6)
            .fill(0)
            .map(() => Math.floor(Math.random() * 300) + 100),
        },
        {
          label: "2024",
          values: Array(6)
            .fill(0)
            .map(() => Math.floor(Math.random() * 300) + 200),
        },
      ],
    });

    // Dados para a tabela
    const regioes = bairro
      ? [bairro]
      : cidade
        ? bairrosPorCidade[cidade]?.slice(0, 5) || []
        : ["Jardins", "Pinheiros", "Vila Madalena", "Moema", "Itaim Bibi"];

    setTableData({
      headers: [
        "Região",
        "Categoria",
        "Potencial (R$ mil)",
        "Crescimento (%)",
        "Classe Predominante",
      ],
      rows: regioes.flatMap((regiao) =>
        (categoriaConsumo
          ? [categoriaConsumo]
          : categoriasConsumo.slice(0, 3)
        ).map((categoria) => [
          regiao,
          categoria,
          (Math.floor(Math.random() * 10000) / 10).toFixed(1),
          (Math.random() * 20 - 5).toFixed(1) + "%",
          classesSociais[Math.floor(Math.random() * classesSociais.length)],
        ]),
      ),
    });
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
              <span className="text-foreground">Potencial de Consumo</span>
            </div>
            <h1 className="text-2xl font-bold">Potencial de Consumo</h1>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Primeira linha de filtros */}
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

              {/* Segunda linha de filtros */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Categoria de Consumo
                </label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={categoriaConsumo}
                  onChange={(e) => setCategoriaConsumo(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {categoriasConsumo.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Classe Social</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={classeSocial}
                  onChange={(e) => setClasseSocial(e.target.value)}
                >
                  <option value="">Todas as classes</option>
                  {classesSociais.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Faixa Etária</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={faixaEtaria}
                  onChange={(e) => setFaixaEtaria(e.target.value)}
                >
                  <option value="">Todas as faixas</option>
                  {faixasEtarias.map((faixa) => (
                    <option key={faixa} value={faixa}>
                      {faixa}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Principal */}
        {dadosCarregados ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Análise de Potencial de Consumo
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowSidePanel(!showSidePanel)}
                className="flex items-center gap-2"
              >
                <PieChart className="h-4 w-4" />
                {showSidePanel ? "Ocultar Painel" : "Insights Estratégicos"}
              </Button>
            </div>

            {/* Gráficos de consumo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ConsumptionBarChart
                data={barChartData}
                loading={loading}
                title={`Comparativo de Consumo por ${bairro ? "Categoria" : "Bairro"}`}
              />
              <ConsumptionPieChart
                data={pieChartData}
                loading={loading}
                title="Distribuição por Categoria de Consumo"
              />
              <div className="lg:col-span-2">
                <ConsumptionLineChart
                  data={lineChartData}
                  loading={loading}
                  title="Evolução do Potencial de Consumo"
                />
              </div>
            </div>

            {/* Tabela de dados */}
            <div className="mt-6">
              <ConsumptionDataTable
                data={tableData}
                loading={loading}
                title="Dados Detalhados de Potencial de Consumo"
              />
            </div>

            {/* Side Panel for Strategic Insights */}
            {showSidePanel && (
              <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg border-l p-4 z-20 overflow-y-auto transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">
                    Insights Estratégicos
                  </h3>
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
                    <h4 className="font-medium mb-2">Resumo da Análise</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {estado && cidade
                        ? `A região de ${cidade}/${estado} apresenta alto potencial de consumo em ${categoriaConsumo || "todas as categorias"}, especialmente para a classe ${classeSocial || "A e B"}.`
                        : "Selecione uma região para ver análises detalhadas."}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" /> Baixar Relatório Completo
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">Sugestões Estratégicas</h4>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-3">
                      {dadosCarregados && (
                        <>
                          <li>
                            • Foco em campanhas para{" "}
                            {faixaEtaria || "25-34 anos"}
                          </li>
                          <li>
                            • Expansão em{" "}
                            {bairro ||
                              (cidade
                                ? "todos os bairros de " + cidade
                                : "regiões de alto potencial")}
                          </li>
                          <li>
                            • Priorizar{" "}
                            {categoriaConsumo || "categorias de maior margem"}
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-2">Exportar Dados</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" /> Baixar CSV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" /> Baixar PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Selecione os filtros e clique em "Aplicar Filtros" para
                visualizar os dados de potencial de consumo.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
