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

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface FilterState {
  cidade: string;
  bairros: string[];
  categorias: string[];
  atividades: string[];
  rendaMedia: string;
}

const FilterPanel = ({
  onFilterChange = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {},
}: FilterPanelProps) => {
  const [localCollapsed, setLocalCollapsed] = useState(isCollapsed);
  const [filters, setFilters] = useState<FilterState>({
    cidade: "",
    bairros: [],
    categorias: [],
    atividades: [],
    rendaMedia: "todos",
  });

  const [expandedSections, setExpandedSections] = useState({
    localizacao: true,
    categorias: true,
    atividades: false,
    demograficos: false,
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
    onToggleCollapse();
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
      cidade: "",
      bairros: [],
      categorias: [],
      atividades: [],
      rendaMedia: "todos",
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
                <select
                  id="cidade"
                  value={filters.cidade}
                  onChange={(e) => handleCidadeChange(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Todas as cidades</option>
                  {cidades.map((cidade) => (
                    <option key={cidade} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
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
