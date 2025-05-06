"use client";

import React from "react";
import { DollarSign, Users, Home, ShoppingBag } from "lucide-react";
import KpiCard from "./KpiCard";

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
    <div className="w-full bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-5 text-slate-800 flex items-center">
        <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
        Indicadores-Chave
      </h2>
      <div className="flex flex-row gap-4 overflow-x-auto pb-2">
        <div className="w-[240px] flex-shrink-0">
          <KpiCard
            title="População"
            value={displayData.population.value}
            change={displayData.population.change}
            icon={<Users className="h-5 w-5" />}
            color="bg-blue-50 border-blue-200"
          />
        </div>
        <div className="w-[240px] flex-shrink-0">
          <KpiCard
            title="Renda Média"
            value={displayData.averageIncome.value}
            change={displayData.averageIncome.change}
            icon={<DollarSign className="h-5 w-5" />}
            color="bg-emerald-50 border-emerald-200"
          />
        </div>
        <div className="w-[240px] flex-shrink-0">
          <KpiCard
            title="Classes Sociais"
            value={displayData.socialClasses.value}
            change={displayData.socialClasses.change}
            icon={<Home className="h-5 w-5" />}
            color="bg-amber-50 border-amber-200"
          />
        </div>
        <div className="w-[240px] flex-shrink-0">
          <KpiCard
            title="Potencial de Consumo"
            value={displayData.consumptionPotential.value}
            change={displayData.consumptionPotential.change}
            icon={<ShoppingBag className="h-5 w-5" />}
            color="bg-purple-50 border-purple-200"
          />
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
