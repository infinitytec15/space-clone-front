"use client";

import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Circle, Square, MapPin, Layers, MousePointer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface CompanyData {
  id: string;
  name: string;
  position: [number, number];
  category: string;
  cnae: string;
  cnaeDescription: string;
  revenue: string;
  employees: number;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface MapContainerProps {
  onAreaSelect?: (area: any) => void;
  onMarkerSelect?: (company: CompanyData) => void;
  onRegionSelect?: (region: string) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    category: string;
    title: string;
  }>;
  companies?: CompanyData[];
  selectedFilters?: any;
}

// Dados de empresas para visualização no mapa
const sampleCompanies: CompanyData[] = [
  {
    id: "1",
    name: "Supermercado Brasília",
    position: [-47.9292, -15.7801],
    category: "varejo",
    cnae: "47.11-3-02",
    cnaeDescription: "Comércio varejista de mercadorias em geral",
    revenue: "médio",
    employees: 45,
    contact: {
      phone: "(61) 3333-4444",
      email: "contato@superbrasilia.com.br",
      website: "www.superbrasilia.com.br",
    },
  },
  {
    id: "2",
    name: "Restaurante Sabor Brasileiro",
    position: [-47.9392, -15.7901],
    category: "alimentacao",
    cnae: "56.11-2-01",
    cnaeDescription: "Restaurantes e similares",
    revenue: "pequeno",
    employees: 12,
    contact: {
      phone: "(61) 3333-5555",
      email: "contato@saborbrasileiro.com.br",
      website: "www.saborbrasileiro.com.br",
    },
  },
  {
    id: "3",
    name: "Clínica Saúde Total",
    position: [-47.9192, -15.7701],
    category: "saude",
    cnae: "86.30-5-03",
    cnaeDescription: "Atividade médica ambulatorial",
    revenue: "médio",
    employees: 28,
    contact: {
      phone: "(61) 3333-6666",
      email: "contato@clinicasaudetotal.com.br",
      website: "www.clinicasaudetotal.com.br",
    },
  },
  {
    id: "4",
    name: "Escola Futuro Brilhante",
    position: [-47.9092, -15.7601],
    category: "educacao",
    cnae: "85.13-9-00",
    cnaeDescription: "Ensino fundamental",
    revenue: "grande",
    employees: 120,
    contact: {
      phone: "(61) 3333-7777",
      email: "contato@futurobrilhante.edu.br",
      website: "www.futurobrilhante.edu.br",
    },
  },
  {
    id: "5",
    name: "TechSoft Soluções",
    position: [-47.9492, -15.7851],
    category: "tecnologia",
    cnae: "62.01-5-01",
    cnaeDescription: "Desenvolvimento de programas de computador sob encomenda",
    revenue: "pequeno",
    employees: 15,
    contact: {
      phone: "(61) 3333-8888",
      email: "contato@techsoft.com.br",
      website: "www.techsoft.com.br",
    },
  },
  {
    id: "6",
    name: "Farmácia Saúde Plena",
    position: [-47.935, -15.775],
    category: "saude",
    cnae: "47.71-7-01",
    cnaeDescription: "Comércio varejista de produtos farmacêuticos",
    revenue: "médio",
    employees: 22,
    contact: {
      phone: "(61) 3333-9999",
      email: "contato@farmaciasaudeplena.com.br",
      website: "www.farmaciasaudeplena.com.br",
    },
  },
  {
    id: "7",
    name: "Faculdade Inovação",
    position: [-47.915, -15.765],
    category: "educacao",
    cnae: "85.31-7-00",
    cnaeDescription: "Educação superior - graduação",
    revenue: "grande",
    employees: 180,
    contact: {
      phone: "(61) 3333-1010",
      email: "contato@faculdadeinovacao.edu.br",
      website: "www.faculdadeinovacao.edu.br",
    },
  },
];

const MapContainer = ({
  initialCenter = [-47.9292, -15.7801], // Brasília as default
  initialZoom = 12,
  markers = [],
  companies = sampleCompanies,
  selectedFilters = {},
}: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedTool, setSelectedTool] = useState<
    "pointer" | "circle" | "polygon"
  >("pointer");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeDrawing, setActiveDrawing] = useState<any>(null);

  // Category colors for markers
  const categoryColors: Record<string, string> = {
    comercial: "bg-blue-500",
    residencial: "bg-green-500",
    industrial: "bg-amber-500",
    servicos: "bg-purple-500",
    outros: "bg-gray-500",
    varejo: "bg-blue-600",
    alimentacao: "bg-orange-500",
    saude: "bg-red-500",
    educacao: "bg-green-600",
    tecnologia: "bg-indigo-500",
    financeiro: "bg-emerald-500",
    transporte: "bg-yellow-500",
    construcao: "bg-stone-500",
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Use the Mapbox token from environment variables
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    if (!mapboxToken) {
      console.error(
        "Mapbox token is missing. Please set NEXT_PUBLIC_MAPBOX_TOKEN environment variable.",
      );
      return;
    }

    // Set the Mapbox access token
    mapboxgl.accessToken = mapboxToken;

    // Initialize the map
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false,
    });

    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), "top-right");
    newMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right",
    );
    newMap.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Set up event handlers
    newMap.on("load", () => {
      setMapLoaded(true);

      // Add markers when map is loaded
      markers.forEach((marker) => {
        const el = document.createElement("div");
        el.className = `w-4 h-4 rounded-full ${categoryColors[marker.category] || "bg-gray-500"} ring-2 ring-white`;

        new mapboxgl.Marker(el).setLngLat(marker.position).addTo(newMap);
      });

      // Add company markers
      companies.forEach((company) => {
        // Create marker element with enhanced styling
        const el = document.createElement("div");
        el.className = `w-6 h-6 rounded-full ${categoryColors[company.category] || "bg-gray-500"} ring-2 ring-white shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110`;

        // Add animation effect on hover
        el.style.transition = "all 0.2s ease-in-out";
        el.addEventListener("mouseover", () => {
          el.style.transform = "scale(1.2)";
          el.style.zIndex = "999";
        });
        el.addEventListener("mouseout", () => {
          el.style.transform = "scale(1)";
          el.style.zIndex = "auto";
        });

        // Add icon based on category
        const iconElement = document.createElement("span");
        iconElement.className = "text-white text-xs font-bold";

        // Use first letter of category as icon
        iconElement.textContent = company.category.charAt(0).toUpperCase();
        el.appendChild(iconElement);

        // Create enhanced popup with more information
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: true,
          maxWidth: "300px",
        }).setHTML(
          `<div class="p-3 bg-white rounded-lg shadow-md">
            <h3 class="font-bold text-sm mb-1">${company.name}</h3>
            <div class="flex items-center mb-1">
              <span class="inline-block w-2 h-2 rounded-full ${categoryColors[company.category] || "bg-gray-500"} mr-1"></span>
              <p class="text-xs font-medium">${company.category.charAt(0).toUpperCase() + company.category.slice(1)}</p>
            </div>
            <p class="text-xs text-gray-600 mb-1">${company.cnaeDescription}</p>
            <p class="text-xs text-gray-600 mb-1">Porte: ${company.revenue.charAt(0).toUpperCase() + company.revenue.slice(1)} | Funcionários: ${company.employees}</p>
            ${company.contact?.phone ? `<p class="text-xs text-gray-600">Tel: ${company.contact.phone}</p>` : ""}
            <div class="mt-3">
              <button id="details-btn-${company.id}" class="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-primary/90 transition-colors">
                Ver detalhes
              </button>
            </div>
          </div>`,
        );

        // Create marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat(company.position)
          .setPopup(popup)
          .addTo(newMap);

        // Add click event to marker
        el.addEventListener("click", () => {
          // Close any open popups
          const openPopups = document.querySelectorAll(".mapboxgl-popup");
          openPopups.forEach((popup) => popup.remove());

          // Open this popup
          marker.togglePopup();
        });

        // Add event listener for the "Ver detalhes" button after popup is added to DOM
        popup.on("open", () => {
          setTimeout(() => {
            const detailsBtn = document.getElementById(
              `details-btn-${company.id}`,
            );
            if (detailsBtn) {
              detailsBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Dispatch custom event instead of calling prop function
                window.dispatchEvent(
                  new CustomEvent("markerselect", { detail: company }),
                );
              });
            }
          }, 10);
        });
      });
    });

    map.current = newMap;

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialCenter, initialZoom, markers, categoryColors, companies]);

  const handleToolSelect = (tool: "pointer" | "circle" | "polygon") => {
    setSelectedTool(tool);

    // Clear any active drawing
    if (activeDrawing) {
      setActiveDrawing(null);
    }

    // In a real implementation, we would enable the appropriate drawing mode
    // using something like MapboxDraw
  };

  const handleAreaSelect = (area: any) => {
    // Dispatch custom event instead of calling prop function
    window.dispatchEvent(new CustomEvent("areaselect", { detail: area }));
  };

  const handleRegionSelect = (region: string) => {
    // Dispatch custom event instead of calling prop function
    window.dispatchEvent(new CustomEvent("regionselect", { detail: region }));
  };

  return (
    <Card className="w-full h-full bg-background border rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-full">
        {/* Map Container */}
        <div
          ref={mapContainer}
          className="w-full h-[600px] bg-slate-100"
          style={{
            position: "relative",
          }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-100">
              <p className="text-lg font-medium">Carregando mapa...</p>
            </div>
          )}
        </div>

        {/* Map Controls - Repositioned below the map */}
        <div className="p-4 border-t flex justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className={`${selectedTool === "pointer" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  onClick={() => handleToolSelect("pointer")}
                >
                  <MousePointer className="h-4 w-4 mr-2" />
                  Selecionar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Selecionar e interagir com pontos no mapa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className={`${selectedTool === "circle" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  onClick={() => handleToolSelect("circle")}
                >
                  <Circle className="h-4 w-4 mr-2" />
                  Círculo
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Desenhar um círculo para selecionar área</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className={`${selectedTool === "polygon" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  onClick={() => handleToolSelect("polygon")}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Polígono
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Desenhar um polígono para selecionar área</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-background">
                  <Layers className="h-4 w-4 mr-2" />
                  Camadas
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gerenciar camadas do mapa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Map Legend - Enhanced with better styling and more information */}
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <span className="inline-block w-2 h-5 bg-primary rounded-full mr-2"></span>
            Legenda - Categorias
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600 shadow-sm"></div>
              <span className="text-xs font-medium">Varejo</span>
              <span className="text-xs text-gray-500 ml-auto">
                {companies.filter((c) => c.category === "varejo").length} pontos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div>
              <span className="text-xs font-medium">Alimentação</span>
              <span className="text-xs text-gray-500 ml-auto">
                {companies.filter((c) => c.category === "alimentacao").length}{" "}
                pontos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
              <span className="text-xs font-medium">Saúde</span>
              <span className="text-xs text-gray-500 ml-auto">
                {companies.filter((c) => c.category === "saude").length} pontos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600 shadow-sm"></div>
              <span className="text-xs font-medium">Educação</span>
              <span className="text-xs text-gray-500 ml-auto">
                {companies.filter((c) => c.category === "educacao").length}{" "}
                pontos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-sm"></div>
              <span className="text-xs font-medium">Tecnologia</span>
              <span className="text-xs text-gray-500 ml-auto">
                {companies.filter((c) => c.category === "tecnologia").length}{" "}
                pontos
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Total: {companies.length} empresas
            </p>
          </div>
        </div>

        {/* Selection Info */}
        {selectedTool !== "pointer" && (
          <div className="absolute top-4 left-4 bg-background/90 p-3 rounded-md shadow-md">
            <p className="text-sm">
              {selectedTool === "circle"
                ? "Clique e arraste para desenhar um círculo"
                : "Clique para adicionar pontos ao polígono"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapContainer;
