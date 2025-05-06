"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Upload,
  Download,
  Plus,
  Trash2,
  Edit,
  Map,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

interface Point {
  id: string;
  name: string;
  category: string;
  notes?: string;
  coordinates: [number, number]; // [longitude, latitude]
  imageUrl?: string;
}

export default function SpaceManager() {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<any>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.error("Mapbox token is missing");
      return;
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-46.6333, -23.5505], // São Paulo
      zoom: 12,
    });

    // Add drawing controls
    map.current.on("load", () => {
      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          point: true,
          polygon: true,
          trash: true,
        },
      });

      map.current?.addControl(draw.current);

      // Handle draw events
      map.current?.on("draw.create", handleDrawCreate);
      map.current?.on("draw.delete", handleDrawDelete);
      map.current?.on("draw.update", handleDrawUpdate);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Handle draw events
  const handleDrawCreate = (e: any) => {
    const features = e.features;
    if (features.length > 0) {
      const feature = features[0];
      if (feature.geometry.type === "Point") {
        const coords = feature.geometry.coordinates;
        const newPoint: Point = {
          id: feature.id,
          name: `Ponto ${points.length + 1}`,
          category: "Não categorizado",
          coordinates: [coords[0], coords[1]],
        };
        setPoints([...points, newPoint]);
        setSelectedPoint(newPoint);
        setIsFormOpen(true);
      }
    }
  };

  const handleDrawDelete = (e: any) => {
    const ids = e.features.map((f: any) => f.id);
    setPoints(points.filter((p) => !ids.includes(p.id)));
    if (selectedPoint && ids.includes(selectedPoint.id)) {
      setSelectedPoint(null);
      setIsFormOpen(false);
    }
  };

  const handleDrawUpdate = (e: any) => {
    const feature = e.features[0];
    if (feature && feature.geometry.type === "Point") {
      const coords = feature.geometry.coordinates;
      setPoints(
        points.map((p) => {
          if (p.id === feature.id) {
            return { ...p, coordinates: [coords[0], coords[1]] };
          }
          return p;
        }),
      );
    }
  };

  // Handle CSV upload
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split("\n");
        const headers = lines[0].split(",");

        // Check required headers
        const nameIndex = headers.findIndex(
          (h) => h.trim().toLowerCase() === "name",
        );
        const latIndex = headers.findIndex(
          (h) => h.trim().toLowerCase() === "latitude",
        );
        const lngIndex = headers.findIndex(
          (h) => h.trim().toLowerCase() === "longitude",
        );
        const categoryIndex = headers.findIndex(
          (h) => h.trim().toLowerCase() === "category",
        );

        if (nameIndex === -1 || latIndex === -1 || lngIndex === -1) {
          throw new Error("CSV deve conter colunas: name, latitude, longitude");
        }

        const newPoints: Point[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(",");
          const name = values[nameIndex].trim();
          const lat = parseFloat(values[latIndex].trim());
          const lng = parseFloat(values[lngIndex].trim());
          const category =
            categoryIndex !== -1
              ? values[categoryIndex].trim()
              : "Não categorizado";

          if (isNaN(lat) || isNaN(lng)) continue;

          const newPoint: Point = {
            id: `csv-${Date.now()}-${i}`,
            name,
            category,
            coordinates: [lng, lat],
          };

          newPoints.push(newPoint);
        }

        setPoints([...points, ...newPoints]);

        // Add markers to map
        newPoints.forEach((point) => {
          const el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundColor = "#3b82f6";
          el.style.width = "15px";
          el.style.height = "15px";
          el.style.borderRadius = "50%";

          new mapboxgl.Marker(el)
            .setLngLat(point.coordinates)
            .addTo(map.current!);
        });

        setIsUploading(false);
      } catch (error: any) {
        setUploadError(error.message);
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setUploadError("Erro ao ler o arquivo");
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  // Export points to CSV
  const exportToCsv = () => {
    if (points.length === 0) return;

    const headers = ["name", "category", "latitude", "longitude", "notes"];
    const csvRows = [
      headers.join(","),
      ...points.map((point) => {
        return [
          point.name,
          point.category,
          point.coordinates[1], // latitude
          point.coordinates[0], // longitude
          point.notes || "",
        ].join(",");
      }),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `space-manager-points-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left sidebar - Points list */}
        <div className="w-full lg:w-80 border-r p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pontos</h2>
            <div className="flex space-x-2">
              <label htmlFor="csv-upload" className="cursor-pointer">
                <div className="bg-primary text-primary-foreground h-8 px-3 rounded-md inline-flex items-center justify-center text-xs font-medium transition-colors hover:bg-primary/90">
                  <Upload className="h-3.5 w-3.5 mr-1" />
                  CSV
                </div>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleCsvUpload}
                  disabled={isUploading}
                />
              </label>
              <Button
                size="sm"
                variant="outline"
                onClick={exportToCsv}
                disabled={points.length === 0}
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                CSV
              </Button>
            </div>
          </div>

          {uploadError && (
            <div className="bg-destructive/10 text-destructive p-2 rounded-md mb-4 text-xs">
              {uploadError}
            </div>
          )}

          {/* Points list */}
          <div className="space-y-2">
            {points.length === 0 ? (
              <div className="text-muted-foreground text-sm p-4 text-center border rounded-md">
                Nenhum ponto cadastrado.
                <br />
                Clique no mapa ou importe um CSV.
              </div>
            ) : (
              points.map((point) => (
                <div
                  key={point.id}
                  className={`border rounded-md p-3 cursor-pointer transition-colors ${selectedPoint?.id === point.id ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
                  onClick={() => {
                    setSelectedPoint(point);
                    map.current?.flyTo({
                      center: point.coordinates,
                      zoom: 15,
                    });
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{point.name}</div>
                      <Badge variant="outline" className="mt-1">
                        {point.category}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPoint(point);
                          setIsFormOpen(true);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPoints(points.filter((p) => p.id !== point.id));
                          if (selectedPoint?.id === point.id) {
                            setSelectedPoint(null);
                            setIsFormOpen(false);
                          }
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main content - Map */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <Map className="mr-2 h-6 w-6" />
              Gestão de Pontos
            </h1>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  setSelectedPoint(null);
                  setIsFormOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Novo Ponto
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div ref={mapContainer} className="absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
