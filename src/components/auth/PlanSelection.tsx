"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface PlanSelectionProps {
  onSelect: (planId: string) => void;
  selectedPlanId?: string;
}

export default function PlanSelection({
  onSelect,
  selectedPlanId = "basic",
}: PlanSelectionProps) {
  const [selected, setSelected] = useState<string>(selectedPlanId);

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 199/mês",
      description: "Ideal para pequenos negócios e análises iniciais",
      features: [
        "Acesso a dados demográficos básicos",
        "Visualização de mapas",
        "5 consultas por dia",
        "Exportação em PDF",
      ],
    },
    {
      id: "pro",
      name: "Profissional",
      price: "R$ 499/mês",
      description: "Para empresas que precisam de análises detalhadas",
      features: [
        "Todos os recursos do plano Básico",
        "Dados econômicos avançados",
        "Análises de potencial de consumo",
        "20 consultas por dia",
        "Exportação em Excel e CSV",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "R$ 999/mês",
      description: "Solução completa para grandes corporações",
      features: [
        "Todos os recursos do plano Profissional",
        "API de integração",
        "Consultas ilimitadas",
        "Suporte prioritário",
        "Análises personalizadas",
        "Acesso a dados históricos",
      ],
    },
  ];

  const handleSelect = (planId: string) => {
    setSelected(planId);
    onSelect(planId);
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
          Escolha seu plano
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Selecione o plano que melhor atende às suas necessidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border p-6 shadow-sm transition-all ${
              selected === plan.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500"
                : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                Recomendado
              </div>
            )}

            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                {plan.name}
              </h4>
              <div className="mt-2 mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {plan.price}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="h-4 w-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSelect(plan.id)}
              variant={selected === plan.id ? "default" : "outline"}
              className="w-full"
            >
              {selected === plan.id ? "Selecionado" : "Selecionar"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
