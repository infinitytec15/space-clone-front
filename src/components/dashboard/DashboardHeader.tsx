"use client";

import React from "react";
import { MapPin, Filter, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  onExport?: () => void;
  onShare?: () => void;
  onRegionChange?: (region: string) => void;
  selectedRegion?: string;
}

const DashboardHeader = ({
  title = "Dashboard Geoespacial",
  subtitle = "Visualização e análise de dados demográficos e econômicos",
  onExport = () => {},
  onShare = () => {},
  onRegionChange = () => {},
  selectedRegion = "Brasil",
}: DashboardHeaderProps) => {
  const regions = [
    "Brasil",
    "Norte",
    "Nordeste",
    "Centro-Oeste",
    "Sudeste",
    "Sul",
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-4 border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center">
            <Select value={selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a região" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-1.5" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-1.5" />
              Compartilhar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
