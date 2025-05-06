"use client";

import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {
  Circle,
  Square,
  MapPin,
  Layers,
  MousePointer,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Import Mapbox GL Draw styles
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

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
    "pointer" | "circle" | "polygon" | "line" | "trash"
  >("pointer");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeDrawing, setActiveDrawing] = useState<any>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [customMarkers, setCustomMarkers] = useState<mapboxgl.Marker[]>([]);

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
    const mapboxToken =
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
      "pk.eyJ1IjoiZGVtby1zcGFjZWRhdGEiLCJhIjoiY2xzMnRtcWJsMDFvMzJrcGR0ZWRtZGJrZSJ9.YFRdnQJTrXUDnb5Fq6ydcA";

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

    // Initialize the draw control
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        line_string: false,
        point: false,
        trash: false,
      },
      styles: [
        // Style for points
        {
          id: "gl-draw-point",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"]],
          paint: {
            "circle-color": "#3b82f6",
            "circle-radius": 5,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        },
        // Style for polygon fill
        {
          id: "gl-draw-polygon-fill",
          type: "fill",
          filter: ["all", ["==", "$type", "Polygon"]],
          paint: {
            "fill-color": "#3b82f6",
            "fill-outline-color": "#3b82f6",
            "fill-opacity": 0.1,
          },
        },
        // Style for polygon outline
        {
          id: "gl-draw-polygon-stroke",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"]],
          paint: {
            "line-color": "#3b82f6",
            "line-width": 2,
          },
        },
        // Style for lines
        {
          id: "gl-draw-line",
          type: "line",
          filter: ["all", ["==", "$type", "LineString"]],
          paint: {
            "line-color": "#3b82f6",
            "line-width": 2,
          },
        },
      ],
    });

    // Add the draw control to the map
    newMap.addControl(draw, "top-left");
    drawRef.current = draw;

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

      // Set up draw event listeners
      newMap.on("draw.create", (e) => {
        console.log("A drawing was created", e.features);
        // You can dispatch an event or call a function here
        handleAreaSelect(e.features);
      });

      newMap.on("draw.update", (e) => {
        console.log("A drawing was updated", e.features);
        // You can dispatch an event or call a function here
        handleAreaSelect(e.features);
      });

      newMap.on("draw.delete", (e) => {
        console.log("A drawing was deleted", e.features);
        // You can dispatch an event or call a function here
      });

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
        el.className = `w-6 h-6 rounded-full ${categoryColors[company.category] || "bg-gray-500"} ring-2 ring-white shadow-md flex items-center justify-center cursor-pointer`;

        // Set fixed position to prevent movement on hover
        el.style.position = "relative";
        el.style.transform = "translate(-50%, -50%)";

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

  const handleToolSelect = (
    tool: "pointer" | "circle" | "polygon" | "line" | "trash",
  ) => {
    setSelectedTool(tool);

    // Clear any active drawing
    if (activeDrawing) {
      setActiveDrawing(null);
    }

    if (!map.current || !drawRef.current) return;

    // Disable all draw modes first
    drawRef.current.changeMode("simple_select");

    // Enable the appropriate drawing mode based on the selected tool
    switch (tool) {
      case "pointer":
        drawRef.current.changeMode("simple_select");
        break;
      case "circle":
        // Note: MapboxDraw doesn't have a built-in circle mode, so we use polygon as a fallback
        // In a real implementation, you might want to use a custom circle mode plugin
        drawRef.current.changeMode("draw_polygon");
        break;
      case "polygon":
        drawRef.current.changeMode("draw_polygon");
        break;
      case "line":
        drawRef.current.changeMode("draw_line_string");
        break;
      case "trash":
        drawRef.current.trash();
        setSelectedTool("pointer");
        break;
      default:
        break;
    }

    // Adiciona um evento de clique no mapa para adicionar pontos quando estiver no modo pointer
    if (tool === "pointer" && map.current) {
      map.current.on("click", addPointOnClick);
    } else if (map.current) {
      // Remove o evento de clique quando não estiver no modo pointer
      map.current.off("click", addPointOnClick);
    }
  };

  const handleAreaSelect = (area: any) => {
    // Dispatch custom event instead of calling prop function
    window.dispatchEvent(new CustomEvent("areaselect", { detail: area }));
  };

  const handleRegionSelect = (region: string) => {
    // Dispatch custom event instead of calling prop function
    window.dispatchEvent(new CustomEvent("regionselect", { detail: region }));
  };

  // Função para adicionar pontos ao clicar no mapa
  const addPointOnClick = (e: mapboxgl.MapMouseEvent) => {
    if (!map.current) return;

    // Gera uma categoria aleatória para o ponto
    const categories = [
      "varejo",
      "alimentacao",
      "saude",
      "educacao",
      "tecnologia",
    ];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    // Cria o elemento do marcador
    const el = document.createElement("div");
    el.className = `w-6 h-6 rounded-full ${categoryColors[randomCategory] || "bg-gray-500"} ring-2 ring-white shadow-md flex items-center justify-center cursor-pointer`;
    el.style.position = "relative";
    el.style.transform = "translate(-50%, -50%)";

    // Adiciona a letra inicial da categoria
    const iconElement = document.createElement("span");
    iconElement.className = "text-white text-xs font-bold";
    iconElement.textContent = randomCategory.charAt(0).toUpperCase();
    el.appendChild(iconElement);

    // Cria o popup
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: true,
      maxWidth: "300px",
    }).setHTML(
      `<div class="p-3 bg-white rounded-lg shadow-md">
        <h3 class="font-bold text-sm mb-1">Novo Ponto</h3>
        <div class="flex items-center mb-1">
          <span class="inline-block w-2 h-2 rounded-full ${categoryColors[randomCategory] || "bg-gray-500"} mr-1"></span>
          <p class="text-xs font-medium">${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}</p>
        </div>
        <p class="text-xs text-gray-600 mb-1">Ponto adicionado pelo usuário</p>
        <p class="text-xs text-gray-600 mb-1">Coordenadas: ${e.lngLat.lng.toFixed(4)}, ${e.lngLat.lat.toFixed(4)}</p>
      </div>`,
    );

    // Cria o marcador e o adiciona ao mapa
    const newMarker = new mapboxgl.Marker(el)
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .setPopup(popup)
      .addTo(map.current);

    // Adiciona o marcador à lista de marcadores personalizados
    setCustomMarkers((prev) => [...prev, newMarker]);

    // Adiciona evento de clique ao marcador
    el.addEventListener("click", () => {
      // Fecha outros popups abertos
      const openPopups = document.querySelectorAll(".mapboxgl-popup");
      openPopups.forEach((popup) => popup.remove());

      // Abre este popup
      newMarker.togglePopup();
    });
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-slate-100">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm font-medium">Carregando mapa...</p>
            </div>
          )}
        </div>

        {/* Map Controls - Modern floating toolbar */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-1.5 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === "pointer" ? "default" : "ghost"}
                  size="icon"
                  className={`rounded-full h-9 w-9 ${selectedTool === "pointer" ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => handleToolSelect("pointer")}
                >
                  <MousePointer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>Selecionar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-4 w-px bg-gray-200 mx-1"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === "circle" ? "default" : "ghost"}
                  size="icon"
                  className={`rounded-full h-9 w-9 ${selectedTool === "circle" ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => handleToolSelect("circle")}
                >
                  <Circle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>Desenhar círculo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === "polygon" ? "default" : "ghost"}
                  size="icon"
                  className={`rounded-full h-9 w-9 ${selectedTool === "polygon" ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => handleToolSelect("polygon")}
                >
                  <Square className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>Desenhar polígono</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === "line" ? "default" : "ghost"}
                  size="icon"
                  className={`rounded-full h-9 w-9 ${selectedTool === "line" ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => handleToolSelect("line")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>Desenhar linha</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-4 w-px bg-gray-200 mx-1"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleToolSelect("trash")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>Apagar seleção</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-4 w-px bg-gray-200 mx-1"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-gray-700 hover:bg-gray-100"
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>Camadas do mapa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Map Legend - Modern collapsible panel */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 max-w-[220px] transition-all duration-200 hover:shadow-xl">
          <h4 className="text-sm font-semibold mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-1.5 h-5 bg-primary rounded-full mr-2"></span>
              <span>Categorias</span>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] font-normal py-0 h-5"
            >
              {companies.length} empresas
            </Badge>
          </h4>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-100"></div>
              <span className="text-xs font-medium">Varejo</span>
              <Badge
                variant="secondary"
                className="ml-auto text-[10px] font-normal py-0 h-4 min-w-[24px] flex items-center justify-center"
              >
                {companies.filter((c) => c.category === "varejo").length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-100"></div>
              <span className="text-xs font-medium">Alimentação</span>
              <Badge
                variant="secondary"
                className="ml-auto text-[10px] font-normal py-0 h-4 min-w-[24px] flex items-center justify-center"
              >
                {companies.filter((c) => c.category === "alimentacao").length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-100"></div>
              <span className="text-xs font-medium">Saúde</span>
              <Badge
                variant="secondary"
                className="ml-auto text-[10px] font-normal py-0 h-4 min-w-[24px] flex items-center justify-center"
              >
                {companies.filter((c) => c.category === "saude").length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600 ring-2 ring-green-100"></div>
              <span className="text-xs font-medium">Educação</span>
              <Badge
                variant="secondary"
                className="ml-auto text-[10px] font-normal py-0 h-4 min-w-[24px] flex items-center justify-center"
              >
                {companies.filter((c) => c.category === "educacao").length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-indigo-100"></div>
              <span className="text-xs font-medium">Tecnologia</span>
              <Badge
                variant="secondary"
                className="ml-auto text-[10px] font-normal py-0 h-4 min-w-[24px] flex items-center justify-center"
              >
                {companies.filter((c) => c.category === "tecnologia").length}
              </Badge>
            </div>
          </div>
        </div>

        {/* Selection Info - Modern floating notification */}
        {selectedTool !== "pointer" && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-fadeIn z-10">
            <p className="text-xs font-medium flex items-center">
              {selectedTool === "circle" ? (
                <>
                  <Circle className="h-3.5 w-3.5 mr-2 text-blue-300" />
                  Clique e arraste para desenhar um círculo
                </>
              ) : selectedTool === "polygon" ? (
                <>
                  <Square className="h-3.5 w-3.5 mr-2 text-blue-300" />
                  Clique para adicionar pontos ao polígono
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5 mr-2 text-blue-300" />
                  Clique para adicionar pontos à linha
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapContainer;
