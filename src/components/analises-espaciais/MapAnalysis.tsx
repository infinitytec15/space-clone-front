"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useSpatialAnalysisStore } from "@/lib/zustand/spatialAnalysisStore";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { v4 as uuidv4 } from "uuid";

// Temporary mapbox token - in production this should be an environment variable
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNrZXhhbXBsZSJ9.example";

// Random color generator for areas
const getRandomColor = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F033FF",
    "#FF3333",
    "#33FFF3",
    "#F3FF33",
    "#FF33A1",
    "#33A1FF",
    "#A133FF",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function MapAnalysis() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get state from Zustand store
  const {
    activeDrawingTool,
    isDrawing,
    selectedAreas,
    setIsDrawing,
    addSelectedArea,
    setActiveDrawingTool,
  } = useSpatialAnalysisStore();

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Set mapbox token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-46.6333, -23.5505], // São Paulo coordinates
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Initialize draw control
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: true,
      },
      userProperties: true,
    });

    // Add draw control to map
    map.current.addControl(draw.current, "top-left");

    // Set map loaded state when map is loaded
    map.current.on("load", () => {
      setMapLoaded(true);
    });

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle drawing tool changes
  useEffect(() => {
    if (!mapLoaded || !map.current || !draw.current) return;

    if (activeDrawingTool) {
      setIsDrawing(true);

      // Set the appropriate drawing mode based on the active tool
      switch (activeDrawingTool) {
        case "polygon":
          draw.current.changeMode("draw_polygon");
          break;
        case "circle":
          // Note: MapboxDraw doesn't have a built-in circle mode
          // We'll use polygon as a fallback and implement circle in the next iteration
          draw.current.changeMode("draw_polygon");
          break;
        case "radius":
          // For radius, we'll use point as a starting point
          draw.current.changeMode("draw_point");
          break;
        default:
          draw.current.changeMode("simple_select");
          break;
      }
    } else {
      // If no active drawing tool, switch to selection mode
      draw.current.changeMode("simple_select");
      setIsDrawing(false);
    }
  }, [activeDrawingTool, mapLoaded, setIsDrawing]);

  // Handle draw events
  useEffect(() => {
    if (!mapLoaded || !map.current || !draw.current) return;

    // Handle create event
    const handleCreate = (e: any) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const color = getRandomColor();

        // Add the area to the store
        addSelectedArea({
          id: uuidv4(),
          name: `Área ${selectedAreas.length + 1}`,
          type: activeDrawingTool || "polygon",
          coordinates: feature.geometry,
          color: color,
        });

        // Reset the drawing tool after creating an area
        setActiveDrawingTool(null);
        setIsDrawing(false);

        // Clear the drawing
        draw.current?.deleteAll();
      }
    };

    // Add event listeners
    map.current.on("draw.create", handleCreate);

    // Clean up event listeners
    return () => {
      if (map.current) {
        map.current.off("draw.create", handleCreate);
      }
    };
  }, [
    mapLoaded,
    activeDrawingTool,
    selectedAreas,
    addSelectedArea,
    setActiveDrawingTool,
    setIsDrawing,
  ]);

  // Render selected areas on the map
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // TODO: Implement rendering of selected areas in next iteration
    console.log("Selected areas changed:", selectedAreas);

    // Will implement area rendering in next iteration
  }, [selectedAreas, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="absolute inset-0 rounded-lg overflow-hidden"
      />

      {/* Drawing tools overlay */}
      {isDrawing && (
        <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-md z-10">
          <p className="text-sm font-medium">
            {activeDrawingTool === "circle" && "Desenhando círculo..."}
            {activeDrawingTool === "polygon" && "Desenhando polígono..."}
            {activeDrawingTool === "radius" && "Desenhando raio..."}
          </p>
        </div>
      )}
    </div>
  );
}
