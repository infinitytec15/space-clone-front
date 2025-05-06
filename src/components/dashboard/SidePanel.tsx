"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

interface SidePanelProps {
  company: CompanyData | null;
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidePanel = ({ company, isOpen, setSidebarOpen }: SidePanelProps) => {
  if (!isOpen || !company) return null;

  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      varejo: "bg-blue-600",
      alimentacao: "bg-orange-500",
      saude: "bg-red-500",
      educacao: "bg-green-600",
      tecnologia: "bg-indigo-500",
      financeiro: "bg-emerald-500",
      transporte: "bg-yellow-500",
      construcao: "bg-stone-500",
    };

    return categoryColors[category] || "bg-gray-500";
  };

  // Format revenue for display
  const formatRevenue = (revenue: string) => {
    const revenueMap: Record<string, string> = {
      micro: "Micro (até R$ 360 mil)",
      pequeno: "Pequeno (R$ 360 mil - R$ 4,8 milhões)",
      medio: "Médio (R$ 4,8 milhões - R$ 300 milhões)",
      grande: "Grande (acima de R$ 300 milhões)",
    };

    return revenueMap[revenue] || revenue;
  };

  // Format employees for display
  const formatEmployees = (count: number) => {
    if (count < 10) return `${count} (Micro)`;
    if (count < 50) return `${count} (Pequeno)`;
    if (count < 100) return `${count} (Médio)`;
    return `${count} (Grande)`;
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-900 border-l border-blue-200 dark:border-blue-900 shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b border-blue-100 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 flex justify-between items-center">
        <h2 className="text-lg font-medium text-blue-900 dark:text-blue-100">
          Detalhes da Empresa
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Fechar</span>
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Company Header */}
        <div className="space-y-2 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            {company.name}
          </h3>
          <Badge className={`${getCategoryColor(company.category)} shadow-sm`}>
            {company.category.charAt(0).toUpperCase() +
              company.category.slice(1)}
          </Badge>
        </div>

        {/* Company Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1">
                <FileText className="h-4 w-4" /> CNAE
              </p>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                {company.cnae}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> Faturamento
              </p>
              <p className="font-medium capitalize text-blue-900 dark:text-blue-100">
                {formatRevenue(company.revenue)}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1">
              <Building className="h-4 w-4" /> Descrição CNAE
            </p>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              {company.cnaeDescription}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1">
              <Users className="h-4 w-4" /> Funcionários
            </p>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              {formatEmployees(company.employees)}
            </p>
          </div>

          {company.contact && (
            <div className="space-y-2 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Contato
              </p>
              {company.contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-blue-900 dark:text-blue-100">
                    {company.contact.phone}
                  </p>
                </div>
              )}
              {company.contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-blue-900 dark:text-blue-100">
                    {company.contact.email}
                  </p>
                </div>
              )}
              {company.contact.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-blue-900 dark:text-blue-100">
                    {company.contact.website}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <Separator className="bg-blue-200 dark:bg-blue-800" />

        {/* Historical Data */}
        <div className="space-y-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100">
            Histórico de Movimentação
          </h4>

          <Card className="border-blue-200 dark:border-blue-800 shadow-md">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
              <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Faturamento (12 meses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 relative">
                {/* Placeholder for chart - would be replaced with actual Chart.js component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-blue-50 dark:bg-blue-950 rounded-md flex flex-col justify-center items-center">
                    <div className="h-[2px] w-4/5 bg-gradient-to-r from-transparent via-blue-500 to-transparent relative">
                      <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1 left-1/4 shadow-md"></div>
                      <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1 left-2/4 shadow-md"></div>
                      <div className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1 left-3/4 shadow-md"></div>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-4">
                      Gráfico de tendência (placeholder)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-blue-200 dark:border-blue-800 shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Crescimento Anual
                  </p>
                  <div className="flex items-center text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-bold">12.5%</span>
                  </div>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  vs. ano anterior
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800 shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Funcionários
                  </p>
                  <div className="flex items-center text-red-600">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-bold">3.2%</span>
                  </div>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  vs. trimestre anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="bg-blue-200 dark:bg-blue-800" />

        {/* Suggested Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-blue-900 dark:text-blue-100">
            Ações Sugeridas
          </h4>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md shadow-sm">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Região promissora para expansão de negócios similares
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md shadow-sm">
              <p className="text-sm text-green-900 dark:text-green-100">
                Potencial para parcerias estratégicas no setor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
