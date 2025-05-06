"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Map,
  Marker,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "mapbox-gl";
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

interface MapContainerProps {
  onAreaSelect?: (area: any) => void;
  onMarkerSelect?: (marker: any) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    category: string;
    title: string;
  }>;
}

const MapContainer = ({
  onAreaSelect = () => {},
  onMarkerSelect = () => {},
  initialCenter = [-47.9292, -15.7801], // Brasília as default
  initialZoom = 12,
  markers = [
    {
      id: "1",
      position: [-47.9292, -15.7801],
      category: "comercial",
      title: "Shopping Brasília",
    },
    {
      id: "2",
      position: [-47.9392, -15.7901],
      category: "residencial",
      title: "Condomínio Central",
    },
    {
      id: "3",
      position: [-47.9192, -15.7701],
      category: "industrial",
      title: "Zona Industrial",
    },
  ],
}: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
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
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Use the Mapbox token from environment variables
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    const initializeMap = async () => {
      // In a real implementation, we would dynamically import mapbox-gl
      // and properly handle the token
      // const mapboxgl = await import('mapbox-gl');
      // mapboxgl.accessToken = mapboxToken;

      // For demo purposes, we'll just create a placeholder
      const mockMap = {
        on: (event: string, callback: () => void) => {
          if (event === "load") {
            setTimeout(() => {
              callback();
              setMapLoaded(true);
            }, 100);
          }
          return mockMap;
        },
        addControl: () => mockMap,
        remove: () => {},
      } as unknown as Map;

      map.current = mockMap;
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleToolSelect = (tool: "pointer" | "circle" | "polygon") => {
    setSelectedTool(tool);

    // Clear any active drawing
    if (activeDrawing) {
      setActiveDrawing(null);
    }

    // In a real implementation, we would enable the appropriate drawing mode
    // using something like MapboxDraw
  };

  const handleMarkerClick = (marker: any) => {
    onMarkerSelect(marker);
  };

  return (
    <Card className="w-full h-full bg-background border rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-full">
        {/* Map Container */}
        <div
          ref={mapContainer}
          className="w-full h-[600px] bg-slate-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553825250-68aafc8b1c91?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Placeholder for actual map - would be rendered by Mapbox */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <p className="text-lg font-medium">Mapa Interativo</p>
          </div>

          {/* Simulated markers */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${30 + Math.random() * 70}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              onClick={() => handleMarkerClick(marker)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-4 h-4 rounded-full ${categoryColors[marker.category] || "bg-gray-500"} ring-2 ring-white`}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{marker.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className={`${selectedTool === "pointer" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            onClick={() => handleToolSelect("pointer")}
          >
            <MousePointer className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className={`${selectedTool === "circle" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            onClick={() => handleToolSelect("circle")}
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className={`${selectedTool === "polygon" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            onClick={() => handleToolSelect("polygon")}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="bg-background">
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 p-3 rounded-md shadow-md">
          <h4 className="text-sm font-medium mb-2">Legenda</h4>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Comercial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Residencial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-xs">Industrial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs">Serviços</span>
            </div>
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
