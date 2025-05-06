"use client";

import { useState } from "react";
import MapContainer from "@/components/dashboard/MapContainer";
import FilterPanel from "@/components/dashboard/FilterPanel";
import KpiCards from "@/components/dashboard/KpiCards";
import ChartSection from "@/components/dashboard/ChartSection";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    city: "São Paulo",
    neighborhood: "Todos",
    category: "Todos",
    activity: "Todos",
  });

  // Função para lidar com a seleção de região no mapa
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  // Função para lidar com a aplicação de filtros
  const handleFilterChange = (filters: any) => {
    setSelectedFilters(filters);
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
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            <Menu className="h-4 w-4" />
            <span className="ml-2">Filtros</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row">
        {/* Filter Panel - Mobile: Conditional render, Desktop: Always visible */}
        <div
          className={`
            ${filterPanelOpen ? "block" : "hidden"} 
            md:block w-full md:w-80 lg:w-96 border-r dark:border-gray-800 bg-white dark:bg-gray-900 
            md:min-h-[calc(100vh-57px)] overflow-auto
          `}
        >
          <FilterPanel
            onFilterChange={handleFilterChange}
            onClose={() => setFilterPanelOpen(false)}
          />
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 space-y-6 overflow-auto">
          {/* Map Container */}
          <div className="h-[500px] md:h-[600px] bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 shadow-sm overflow-hidden">
            <MapContainer
              selectedFilters={selectedFilters}
              onRegionSelect={handleRegionSelect}
            />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCards
              selectedRegion={selectedRegion}
              selectedFilters={selectedFilters}
            />
          </div>

          {/* Charts Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 shadow-sm p-4">
            <ChartSection
              selectedRegion={selectedRegion}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
