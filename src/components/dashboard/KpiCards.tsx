"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
  Home,
  ShoppingBag,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: {
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
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  data?: {
    population: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
    averageIncome: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
    socialClasses: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
    consumptionPotential: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
  };
}

const KpiCards = ({ data }: KpiCardsProps) => {
  // Default data if none is provided
  const defaultData = {
    population: {
      value: "1.2M",
      change: { value: "12% vs. mês anterior", trend: "up" as const },
    },
    averageIncome: {
      value: "R$ 3.450",
      change: { value: "5% vs. mês anterior", trend: "up" as const },
    },
    socialClasses: {
      value: "B2, C1",
      change: { value: "Sem alteração", trend: "neutral" as const },
    },
    consumptionPotential: {
      value: "R$ 28.5M",
      change: { value: "3% vs. mês anterior", trend: "down" as const },
    },
  };

  const displayData = data || defaultData;

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Indicadores-Chave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="População"
          value={displayData.population.value}
          change={displayData.population.change}
          icon={<Users className="h-5 w-5" />}
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
          title="Potencial de Consumo"
          value={displayData.consumptionPotential.value}
          change={displayData.consumptionPotential.change}
          icon={<ShoppingBag className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};

export default KpiCards;
