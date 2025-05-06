"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useSpatialAnalysisStore } from "@/lib/zustand/spatialAnalysisStore";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { v4 as uuidv4 } from "uuid";
import * as turf from "@turf/turf";

// Use environment variable for Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

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

    // Custom circle mode
    const CircleMode = {
      ...MapboxDraw.modes.draw_polygon,
      onSetup: function () {
        const polygon = this.newFeature({
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [[]],
          },
        });
        this.addFeature(polygon);
        this.clearSelectedFeatures();
        this.updateUIClasses({ mouse: "add" });
        this.setActionableState({
          trash: true,
        });
        this.centerPoint = null;
        this.radius = 0;
        return { polygon };
      },
      onMouseMove: function (state, e) {
        if (!state.polygon) return;
        if (!this.centerPoint) {
          this.centerPoint = [e.lngLat.lng, e.lngLat.lat];
          return;
        }

        this.radius = turf.distance(
          turf.point(this.centerPoint),
          turf.point([e.lngLat.lng, e.lngLat.lat]),
          { units: "kilometers" },
        );

        const circleFeature = turf.circle(this.centerPoint, this.radius, {
          steps: 64,
          units: "kilometers",
        });

        state.polygon.incomingCoords(circleFeature.geometry.coordinates);
        state.polygon.properties = {
          radius: this.radius,
          center: this.centerPoint,
        };
      },
      onClick: function (state, e) {
        if (!this.centerPoint) {
          this.centerPoint = [e.lngLat.lng, e.lngLat.lat];
          return;
        }

        this.changeMode("simple_select", { featureIds: [state.polygon.id] });
      },
    };

    // Initialize draw control with custom modes
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: true,
      },
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
        draw_circle: CircleMode,
      },
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

  // State for radius drawing
  const [radiusPoint, setRadiusPoint] = useState<[number, number] | null>(null);
  const [radiusSize, setRadiusSize] = useState<number>(1); // Default 1km radius
  const [isSettingRadius, setIsSettingRadius] = useState<boolean>(false);

  // Handle drawing tool changes
  useEffect(() => {
    if (!mapLoaded || !map.current || !draw.current) return;

    if (activeDrawingTool) {
      setIsDrawing(true);

      // Reset radius drawing state when changing tools
      setRadiusPoint(null);
      setIsSettingRadius(false);

      // Set the appropriate drawing mode based on the active tool
      switch (activeDrawingTool) {
        case "polygon":
          draw.current.changeMode("draw_polygon");
          break;
        case "circle":
          // Use our custom circle mode
          draw.current.changeMode("draw_circle");
          break;
        case "radius":
          // For radius, we'll use simple_select and handle it manually
          draw.current.changeMode("simple_select");
          // We'll handle radius drawing with our own logic
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

  // Handle radius drawing
  useEffect(() => {
    if (!mapLoaded || !map.current || activeDrawingTool !== "radius") return;

    // Function to handle click for setting the center point of radius
    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      if (!isSettingRadius && activeDrawingTool === "radius") {
        // Set the center point for the radius
        setRadiusPoint([e.lngLat.lng, e.lngLat.lat]);
        setIsSettingRadius(true);
      } else if (isSettingRadius && radiusPoint) {
        // Calculate the radius based on the distance between the center point and the clicked point
        const clickedPoint: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        const distance = turf.distance(
          turf.point(radiusPoint),
          turf.point(clickedPoint),
          { units: "kilometers" },
        );

        // Create a circle feature
        const circleFeature = turf.circle(radiusPoint, distance, {
          steps: 64,
          units: "kilometers",
        });

        const color = getRandomColor();

        // Add the area to the store
        addSelectedArea({
          id: uuidv4(),
          name: `Raio ${selectedAreas.length + 1}`,
          type: "radius",
          coordinates: circleFeature.geometry,
          color: color,
          radius: distance,
          center: radiusPoint,
        });

        // Reset radius drawing state
        setRadiusPoint(null);
        setIsSettingRadius(false);
        setActiveDrawingTool(null);
        setIsDrawing(false);
      }
    };

    // Function to update radius size preview during mouse move
    const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
      if (isSettingRadius && radiusPoint) {
        const mousePoint: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        const distance = turf.distance(
          turf.point(radiusPoint),
          turf.point(mousePoint),
          { units: "kilometers" },
        );
        setRadiusSize(distance);
      }
    };

    // Add event listeners to the map
    map.current.on("click", handleMapClick);
    map.current.on("mousemove", handleMouseMove);

    // Clean up
    return () => {
      if (map.current) {
        map.current.off("click", handleMapClick);
        map.current.off("mousemove", handleMouseMove);
      }
    };
  }, [
    mapLoaded,
    activeDrawingTool,
    isSettingRadius,
    radiusPoint,
    addSelectedArea,
    selectedAreas.length,
    setActiveDrawingTool,
    setIsDrawing,
  ]);

  // Render selected areas on the map
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Remove any existing area layers and sources
    selectedAreas.forEach((area, index) => {
      const areaId = `area-${area.id}`;
      const sourceId = `source-${area.id}`;

      // Remove existing layer and source if they exist
      if (map.current?.getLayer(areaId)) {
        map.current.removeLayer(areaId);
      }
      if (map.current?.getSource(sourceId)) {
        map.current.removeSource(sourceId);
      }
    });

    // Add new layers and sources for each selected area
    selectedAreas.forEach((area, index) => {
      const areaId = `area-${area.id}`;
      const sourceId = `source-${area.id}`;

      // Add source
      map.current?.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: area.coordinates,
          properties: {},
        },
      });

      // Add fill layer
      map.current?.addLayer({
        id: areaId,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": area.color,
          "fill-opacity": 0.3,
          "fill-outline-color": area.color,
        },
      });

      // Add outline layer
      map.current?.addLayer({
        id: `${areaId}-outline`,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": area.color,
          "line-width": 2,
        },
      });
    });
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
            {activeDrawingTool === "radius" &&
              !isSettingRadius &&
              "Clique para definir o centro do raio..."}
            {activeDrawingTool === "radius" &&
              isSettingRadius &&
              "Clique para definir o tamanho do raio..."}
          </p>
        </div>
      )}

      {/* Radius visualization while drawing */}
      {isSettingRadius && radiusPoint && map.current && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md z-10">
          <p className="text-sm font-medium">
            Raio: {radiusSize.toFixed(2)} km
          </p>
        </div>
      )}
    </div>
  );
}
