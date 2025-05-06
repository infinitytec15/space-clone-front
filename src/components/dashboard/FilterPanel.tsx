"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
  isCollapsed?: boolean;
}

interface FilterState {
  cidade: string;
  bairros: string[];
  categorias: string[];
  atividades: string[];
  rendaMedia: string;
  cnae: string[];
  faturamento: string;
  funcionarios: string;
}

const FilterPanel = ({
  onFilterChange = () => {},
  isCollapsed = false,
}: FilterPanelProps) => {
  const [localCollapsed, setLocalCollapsed] = useState(isCollapsed);
  const [filters, setFilters] = useState<FilterState>({
    cidade: "todas",
    bairros: [],
    categorias: [],
    atividades: [],
    rendaMedia: "todos",
    cnae: [],
    faturamento: "todos",
    funcionarios: "todos",
  });

  const [expandedSections, setExpandedSections] = useState({
    localizacao: true,
    categorias: true,
    atividades: false,
    demograficos: false,
    empresas: true,
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Dados de exemplo
  const cidades = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Salvador",
  ];
  const bairros = [
    "Centro",
    "Jardins",
    "Pinheiros",
    "Vila Madalena",
    "Moema",
    "Ipanema",
    "Leblon",
    "Copacabana",
    "Botafogo",
    "Tijuca",
  ];
  const categoriasList = [
    "Alimentação",
    "Vestuário",
    "Eletrônicos",
    "Serviços",
    "Saúde",
    "Educação",
    "Entretenimento",
    "Transporte",
  ];
  const atividadesList = [
    "Restaurantes",
    "Supermercados",
    "Lojas de Roupas",
    "Farmácias",
    "Escolas",
    "Hospitais",
    "Academias",
    "Bancos",
    "Hotéis",
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const toggleCollapse = () => {
    const newState = !localCollapsed;
    setLocalCollapsed(newState);
    window.dispatchEvent(new CustomEvent("togglefilterpanel"));
  };

  const handleCidadeChange = (cidade: string) => {
    const newFilters = { ...filters, cidade };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBairroToggle = (bairro: string) => {
    const newBairros = filters.bairros.includes(bairro)
      ? filters.bairros.filter((b) => b !== bairro)
      : [...filters.bairros, bairro];

    const newFilters = { ...filters, bairros: newBairros };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoriaToggle = (categoria: string) => {
    const newCategorias = filters.categorias.includes(categoria)
      ? filters.categorias.filter((c) => c !== categoria)
      : [...filters.categorias, categoria];

    const newFilters = { ...filters, categorias: newCategorias };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAtividadeToggle = (atividade: string) => {
    const newAtividades = filters.atividades.includes(atividade)
      ? filters.atividades.filter((a) => a !== atividade)
      : [...filters.atividades, atividade];

    const newFilters = { ...filters, atividades: newAtividades };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRendaChange = (value: string) => {
    const newFilters = { ...filters, rendaMedia: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      cidade: "todas",
      bairros: [],
      categorias: [],
      atividades: [],
      rendaMedia: "todos",
      cnae: [],
      faturamento: "todos",
      funcionarios: "todos",
    };
    setFilters(newFilters);
    setSearchTerm("");
    onFilterChange(newFilters);
  };

  const filteredBairros = bairros.filter((bairro) =>
    bairro.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const activeFiltersCount = [
    filters.cidade ? 1 : 0,
    filters.bairros.length,
    filters.categorias.length,
    filters.atividades.length,
    filters.rendaMedia !== "todos" ? 1 : 0,
    filters.cnae.length,
    filters.faturamento !== "todos" ? 1 : 0,
    filters.funcionarios !== "todos" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  if (localCollapsed) {
    return (
      <div className="bg-background border rounded-lg shadow-sm h-full w-12 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="mb-4"
        >
          <Filter className="h-5 w-5" />
          <span className="sr-only">Expandir filtros</span>
        </Button>
        {activeFiltersCount > 0 && (
          <Badge className="bg-primary">{activeFiltersCount}</Badge>
        )}
      </div>
    );
  }

  return (
    <div className="bg-background border rounded-lg shadow-sm h-full w-full max-w-xs overflow-hidden flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge className="bg-primary ml-2">{activeFiltersCount}</Badge>
          )}
        </h2>
        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={toggleCollapse}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Recolher painel</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Seção de Localização */}
        <div className="space-y-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("localizacao")}
          >
            <h3 className="font-medium">Localização</h3>
            {expandedSections.localizacao ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>

          {expandedSections.localizacao && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Select
                  value={filters.cidade}
                  onValueChange={handleCidadeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas as cidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as cidades</SelectItem>
                    {cidades.map((cidade) => (
                      <SelectItem key={cidade} value={cidade}>
                        {cidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Bairros</Label>
                  {filters.bairros.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {filters.bairros.length} selecionados
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar bairros"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <div className="max-h-40 overflow-y-auto space-y-2 mt-2">
                  {filteredBairros.map((bairro) => (
                    <div key={bairro} className="flex items-center space-x-2">
                      <Checkbox
                        id={`bairro-${bairro}`}
                        checked={filters.bairros.includes(bairro)}
                        onCheckedChange={() => handleBairroToggle(bairro)}
                      />
                      <Label
                        htmlFor={`bairro-${bairro}`}
                        className="text-sm cursor-pointer"
                      >
                        {bairro}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Seção de Categorias de Consumo */}
        <div className="space-y-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("categorias")}
          >
            <h3 className="font-medium">Categorias de Consumo</h3>
            {expandedSections.categorias ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>

          {expandedSections.categorias && (
            <div className="space-y-2">
              {filters.categorias.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {filters.categorias.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {cat}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleCategoriaToggle(cat)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <div className="max-h-40 overflow-y-auto space-y-2">
                {categoriasList.map((categoria) => (
                  <div key={categoria} className="flex items-center space-x-2">
                    <Checkbox
                      id={`categoria-${categoria}`}
                      checked={filters.categorias.includes(categoria)}
                      onCheckedChange={() => handleCategoriaToggle(categoria)}
                    />
                    <Label
                      htmlFor={`categoria-${categoria}`}
                      className="text-sm cursor-pointer"
                    >
                      {categoria}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Seção de Atividades Econômicas */}
        <div className="space-y-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("atividades")}
          >
            <h3 className="font-medium">Atividades Econômicas</h3>
            {expandedSections.atividades ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>

          {expandedSections.atividades && (
            <div className="space-y-2">
              {filters.atividades.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {filters.atividades.map((ativ) => (
                    <Badge
                      key={ativ}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {ativ}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleAtividadeToggle(ativ)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <div className="max-h-40 overflow-y-auto space-y-2">
                {atividadesList.map((atividade) => (
                  <div key={atividade} className="flex items-center space-x-2">
                    <Checkbox
                      id={`atividade-${atividade}`}
                      checked={filters.atividades.includes(atividade)}
                      onCheckedChange={() => handleAtividadeToggle(atividade)}
                    />
                    <Label
                      htmlFor={`atividade-${atividade}`}
                      className="text-sm cursor-pointer"
                    >
                      {atividade}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Seção de Empresas */}
        <div className="space-y-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("empresas")}
          >
            <h3 className="font-medium">Empresas</h3>
            {expandedSections.empresas ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>

          {expandedSections.empresas && (
            <div className="space-y-4">
              {/* CNAE */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>CNAE</Label>
                  {filters.cnae.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {filters.cnae.length} selecionados
                    </span>
                  )}
                </div>
                <Select
                  value={filters.cnae.length > 0 ? filters.cnae[0] : "todos"}
                  onValueChange={(value) => {
                    const newCnae = value && value !== "todos" ? [value] : [];
                    const newFilters = { ...filters, cnae: newCnae };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione CNAE" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="47.11-3-02">
                      Comércio varejista
                    </SelectItem>
                    <SelectItem value="56.11-2-01">Restaurantes</SelectItem>
                    <SelectItem value="86.30-5-03">Serviços médicos</SelectItem>
                    <SelectItem value="85.13-9-00">
                      Ensino fundamental
                    </SelectItem>
                    <SelectItem value="62.01-5-01">
                      Desenvolvimento de software
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Faturamento */}
              <div className="space-y-2">
                <Label>Faixa de Faturamento</Label>
                <RadioGroup
                  value={filters.faturamento}
                  onValueChange={(value) => {
                    const newFilters = { ...filters, faturamento: value };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="todos" id="faturamento-todos" />
                    <Label
                      htmlFor="faturamento-todos"
                      className="text-sm cursor-pointer"
                    >
                      Todas as faixas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="micro" id="faturamento-micro" />
                    <Label
                      htmlFor="faturamento-micro"
                      className="text-sm cursor-pointer"
                    >
                      Micro (até R$ 360 mil)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pequeno" id="faturamento-pequeno" />
                    <Label
                      htmlFor="faturamento-pequeno"
                      className="text-sm cursor-pointer"
                    >
                      Pequeno (R$ 360 mil - R$ 4,8 milhões)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medio" id="faturamento-medio" />
                    <Label
                      htmlFor="faturamento-medio"
                      className="text-sm cursor-pointer"
                    >
                      Médio (R$ 4,8 milhões - R$ 300 milhões)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grande" id="faturamento-grande" />
                    <Label
                      htmlFor="faturamento-grande"
                      className="text-sm cursor-pointer"
                    >
                      Grande (acima de R$ 300 milhões)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Funcionários */}
              <div className="space-y-2">
                <Label>Número de Funcionários</Label>
                <RadioGroup
                  value={filters.funcionarios}
                  onValueChange={(value) => {
                    const newFilters = { ...filters, funcionarios: value };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="todos" id="funcionarios-todos" />
                    <Label
                      htmlFor="funcionarios-todos"
                      className="text-sm cursor-pointer"
                    >
                      Todas as faixas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="micro" id="funcionarios-micro" />
                    <Label
                      htmlFor="funcionarios-micro"
                      className="text-sm cursor-pointer"
                    >
                      Micro (até 9 funcionários)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pequeno" id="funcionarios-pequeno" />
                    <Label
                      htmlFor="funcionarios-pequeno"
                      className="text-sm cursor-pointer"
                    >
                      Pequeno (10 a 49 funcionários)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medio" id="funcionarios-medio" />
                    <Label
                      htmlFor="funcionarios-medio"
                      className="text-sm cursor-pointer"
                    >
                      Médio (50 a 99 funcionários)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grande" id="funcionarios-grande" />
                    <Label
                      htmlFor="funcionarios-grande"
                      className="text-sm cursor-pointer"
                    >
                      Grande (100+ funcionários)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Seção de Dados Demográficos */}
        <div className="space-y-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("demograficos")}
          >
            <h3 className="font-medium">Dados Demográficos</h3>
            {expandedSections.demograficos ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>

          {expandedSections.demograficos && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Renda Média</Label>
                <RadioGroup
                  value={filters.rendaMedia}
                  onValueChange={handleRendaChange}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="todos" id="renda-todos" />
                    <Label
                      htmlFor="renda-todos"
                      className="text-sm cursor-pointer"
                    >
                      Todas as faixas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="baixa" id="renda-baixa" />
                    <Label
                      htmlFor="renda-baixa"
                      className="text-sm cursor-pointer"
                    >
                      Baixa renda (até R$ 2.500)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="media" id="renda-media" />
                    <Label
                      htmlFor="renda-media"
                      className="text-sm cursor-pointer"
                    >
                      Média renda (R$ 2.500 - R$ 8.000)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alta" id="renda-alta" />
                    <Label
                      htmlFor="renda-alta"
                      className="text-sm cursor-pointer"
                    >
                      Alta renda (acima de R$ 8.000)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t">
        <Button className="w-full" onClick={() => onFilterChange(filters)}>
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
