"use client";

import { useState } from "react";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MapAnalysis from "@/components/analises-espaciais/MapAnalysis";

export default function SpatialAnalysisPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      </header>

      {/* Breadcrumbs */}
      <div className="bg-muted/30 px-4 py-2 flex items-center text-sm">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-3.5 w-3.5 mr-1" />
          <span>Início</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 mx-1 text-muted-foreground" />
        <span className="font-medium">Análises Espaciais</span>
      </div>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row">
        {/* Sidebar - Filter Panel */}
        <div
          className={`
            ${sidebarOpen ? "block" : "hidden"} 
            md:block w-full md:w-80 lg:w-96 border-r dark:border-gray-800 bg-white dark:bg-gray-900 
            md:min-h-[calc(100vh-93px)] overflow-auto
          `}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filtros de Análise</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Selecione os filtros para análise espacial e desenhe áreas no mapa
              para visualizar dados agregados.
            </p>

            {/* Placeholder para o componente FilterPanel */}
            <div className="border border-dashed border-muted-foreground/50 rounded-md p-4 text-center text-muted-foreground">
              Componente FilterPanel será implementado aqui
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 space-y-6 overflow-auto">
          {/* Map Container */}
          <div className="h-[500px] md:h-[600px] bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 shadow-sm overflow-hidden">
            {/* MapAnalysis Component */}
            <div className="w-full h-full">
              <MapAnalysis />
            </div>
          </div>

          {/* Summary Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Resumo da Análise</h2>

            {/* Placeholder para o componente SummaryPanel */}
            <div className="border border-dashed border-muted-foreground/50 rounded-md p-8 text-center text-muted-foreground">
              Componente SummaryPanel será implementado aqui
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
