"use client";

import { useState, useEffect } from "react";
import MapContainer from "@/components/dashboard/MapContainer";
import FilterPanel from "@/components/dashboard/FilterPanel";
import KpiCards from "@/components/dashboard/KpiCards";
import ChartSection from "@/components/dashboard/ChartSection";
import SidePanel from "@/components/dashboard/SidePanel";
import ChatComponent from "@/components/dashboard/ChatComponent";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDashboardStore } from "@/lib/zustand/dashboardStore";
import type { CompanyData } from "@/components/dashboard/SidePanel";

export default function DashboardClient() {
  const [selectedRegion, setSelectedRegion] = useState<string>("Brasil");
  const [selectedFilters, setSelectedFilters] = useState({
    city: "São Paulo",
    neighborhood: "Todos",
    category: "Todos",
    activity: "Todos",
    cnae: [],
    faturamento: "todos",
    funcionarios: "todos",
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const { toast } = useToast();
  const { openSidePanel } = useDashboardStore();

  // Event listeners for FilterPanel and SidePanel events
  useEffect(() => {
    const handleCloseFilterPanel = () => setFilterPanelOpen(false);
    const handleToggleFilterPanel = () => setFilterPanelOpen(!filterPanelOpen);
    const handleFilterChange = (event: CustomEvent) => {
      if (event.detail) {
        setSelectedFilters(event.detail);
        toast({
          title: "Filtros aplicados",
          description: "Os dados foram atualizados com os novos filtros",
          variant: "default",
        });
      }
    };
    const handleMarkerSelect = (event: CustomEvent) => {
      if (event.detail) {
        console.log("Marker selected:", event.detail);
        openSidePanel(event.detail as CompanyData);
      }
    };
    const handleRegionSelect = (event: CustomEvent) => {
      if (event.detail) {
        setSelectedRegion(event.detail);
        toast({
          title: "Região selecionada",
          description: `Dados atualizados para ${event.detail}`,
          variant: "default",
        });
      }
    };

    window.addEventListener("closefilterpanel", handleCloseFilterPanel);
    window.addEventListener("togglefilterpanel", handleToggleFilterPanel);
    window.addEventListener(
      "filterchange",
      handleFilterChange as EventListener,
    );
    window.addEventListener(
      "markerselect",
      handleMarkerSelect as EventListener,
    );
    window.addEventListener(
      "regionselect",
      handleRegionSelect as EventListener,
    );

    return () => {
      window.removeEventListener("closefilterpanel", handleCloseFilterPanel);
      window.removeEventListener("togglefilterpanel", handleToggleFilterPanel);
      window.removeEventListener(
        "filterchange",
        handleFilterChange as EventListener,
      );
      window.removeEventListener(
        "markerselect",
        handleMarkerSelect as EventListener,
      );
      window.removeEventListener(
        "regionselect",
        handleRegionSelect as EventListener,
      );
    };
  }, [filterPanelOpen, toast, openSidePanel]);

  // Funções para o DashboardHeader
  const handleExport = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados estão sendo exportados",
      variant: "default",
    });
  };

  const handleShare = () => {
    toast({
      title: "Compartilhando dashboard",
      description: "Opções de compartilhamento abertas",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800 bg-opacity-95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">SD</span>
          </div>
          <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Space Data
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            <Menu className="h-4 w-4" />
            <span className="ml-2">Filtros</span>
          </Button>
        </div>
      </header>

      {/* Dashboard Header */}
      <DashboardHeader
        selectedRegion={selectedRegion}
        onRegionChange={(region) => {
          window.dispatchEvent(
            new CustomEvent("regionselect", { detail: region }),
          );
        }}
        onExport={handleExport}
        onShare={handleShare}
      />

      {/* Main Content */}
      <main className="flex flex-col md:flex-row">
        {/* Filter Panel - Mobile: Conditional render, Desktop: Always visible */}
        <aside
          className={`
            ${filterPanelOpen ? "block fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:relative md:bg-transparent md:backdrop-blur-none" : "hidden"} 
            md:block w-full md:w-80 lg:w-96 border-r dark:border-gray-800 bg-white dark:bg-gray-900 
            md:min-h-[calc(100vh-57px)] overflow-auto shadow-lg
          `}
        >
          <div
            className={`${filterPanelOpen ? "h-full w-80 max-w-full bg-white dark:bg-gray-900" : ""}`}
          >
            <FilterPanel />
          </div>
        </aside>

        {/* Dashboard Content */}
        <div className="flex-1 p-2 md:p-4 space-y-4 md:space-y-6 overflow-auto">
          {/* Map Container */}
          <div className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-900 shadow-md overflow-hidden">
            <MapContainer selectedFilters={selectedFilters} />
          </div>

          {/* KPI Cards */}
          <div className="w-full overflow-x-auto pb-2">
            <KpiCards
              selectedRegion={selectedRegion}
              selectedFilters={selectedFilters}
            />
          </div>

          {/* Charts Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-900 shadow-md">
            <ChartSection
              selectedRegion={selectedRegion}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>

        {/* Company Details Sidebar */}
        <SidePanel />

        {/* AI Chat Component */}
        <ChatComponent />
      </main>
    </div>
  );
}
