"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Users,
  GraduationCap,
  DollarSign,
  Home,
  BarChart3,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
}

const KpiCard = ({ title, value, change, icon }: KpiCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs mt-1">
            {change.trend === "up" && (
              <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
            )}
            {change.trend === "down" && (
              <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
            )}
            <span
              className={`${change.trend === "up" ? "text-emerald-500" : ""}${change.trend === "down" ? "text-rose-500" : ""}${change.trend === "neutral" ? "text-muted-foreground" : ""}`}
            >
              {change.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  data?: {
    totalPopulation: {
      value: string;
      change?: { value: string; trend: "up" | "down" | "neutral" };
    };
    ageGroups: {
      value: string;
      change?: { value: string; trend: "up" | "down" | "neutral" };
    };
    averageIncome: {
      value: string;
      change?: { value: string; trend: "up" | "down" | "neutral" };
    };
    socialClasses: {
      value: string;
      change?: { value: string; trend: "up" | "down" | "neutral" };
    };
    educationIndex: {
      value: string;
      change?: { value: string; trend: "up" | "down" | "neutral" };
    };
  };
}

const SociodemografiaKpiCards = ({ data }: KpiCardsProps) => {
  // Dados padrão se nenhum for fornecido
  const defaultData = {
    totalPopulation: {
      value: "2.5M",
      change: { value: "3% vs. ano anterior", trend: "up" as const },
    },
    ageGroups: {
      value: "Jovens: 28%, Adultos: 52%, Idosos: 20%",
      change: { value: "Envelhecimento +2%", trend: "neutral" as const },
    },
    averageIncome: {
      value: "R$ 4.250",
      change: { value: "5% vs. ano anterior", trend: "up" as const },
    },
    socialClasses: {
      value: "A: 8%, B: 22%, C: 45%, D/E: 25%",
      change: { value: "Mobilidade +1.5%", trend: "up" as const },
    },
    educationIndex: {
      value: "0.72",
      change: { value: "2% vs. ano anterior", trend: "up" as const },
    },
  };

  const displayData = data || defaultData;

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Indicadores Sociodemográficos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KpiCard
          title="População Total"
          value={displayData.totalPopulation.value}
          change={displayData.totalPopulation.change}
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          title="Grupos Etários"
          value={displayData.ageGroups.value}
          change={displayData.ageGroups.change}
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <KpiCard
          title="Renda Média"
          value={displayData.averageIncome.value}
          change={displayData.averageIncome.change}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KpiCard
          title="Classes Sociais"
          value={displayData.socialClasses.value}
          change={displayData.socialClasses.change}
          icon={<Home className="h-5 w-5" />}
        />
        <KpiCard
          title="Índice de Educação"
          value={displayData.educationIndex.value}
          change={displayData.educationIndex.change}
          icon={<GraduationCap className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};

export default SociodemografiaKpiCards;
