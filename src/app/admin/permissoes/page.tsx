"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

interface Plan {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  description: string;
}

interface PlanPermission {
  planId: string;
  moduleId: string;
}

export default function PermissionsManagementPage() {
  // Mock data for plans
  const [plans, setPlans] = useState<Plan[]>([
    { id: "1", name: "Básico" },
    { id: "2", name: "Profissional" },
    { id: "3", name: "Enterprise" },
  ]);

  // Mock data for modules
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      name: "Dashboard",
      description: "Visualização do dashboard principal",
    },
    { id: "2", name: "Consumo", description: "Análise de dados de consumo" },
    { id: "3", name: "AI", description: "Recursos de inteligência artificial" },
    {
      id: "4",
      name: "Analytics",
      description: "Análises avançadas e relatórios",
    },
    {
      id: "5",
      name: "Exportação",
      description: "Exportação de dados em diversos formatos",
    },
    { id: "6", name: "API", description: "Acesso à API para integração" },
  ]);

  // Mock data for permissions
  const [permissions, setPermissions] = useState<PlanPermission[]>([
    { planId: "1", moduleId: "1" },
    { planId: "2", moduleId: "1" },
    { planId: "2", moduleId: "2" },
    { planId: "3", moduleId: "1" },
    { planId: "3", moduleId: "2" },
    { planId: "3", moduleId: "3" },
    { planId: "3", moduleId: "4" },
    { planId: "3", moduleId: "5" },
  ]);

  const [selectedPlan, setSelectedPlan] = useState<string>("1");
  const [isSaving, setIsSaving] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePermissionToggle = (moduleId: string) => {
    const existingPermission = permissions.find(
      (p) => p.planId === selectedPlan && p.moduleId === moduleId,
    );

    if (existingPermission) {
      // Remove permission
      setPermissions(
        permissions.filter(
          (p) => !(p.planId === selectedPlan && p.moduleId === moduleId),
        ),
      );
    } else {
      // Add permission
      setPermissions([...permissions, { planId: selectedPlan, moduleId }]);
    }
  };

  const handleSavePermissions = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message or notification here
    }, 1000);
  };

  const hasPermission = (moduleId: string) => {
    return permissions.some(
      (p) => p.planId === selectedPlan && p.moduleId === moduleId,
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Permissões por Plano</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Plans List */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Planos</h2>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-3 rounded-md cursor-pointer ${selectedPlan === plan.id ? "bg-blue-100 dark:bg-blue-900/30" : "hover:bg-gray-100 dark:hover:bg-gray-800/50"}`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Permissions */}
        <div className="w-full md:w-3/4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Módulos para o plano:{" "}
                  {plans.find((p) => p.id === selectedPlan)?.name}
                </h2>
                <Button onClick={handleSavePermissions} disabled={isSaving}>
                  {isSaving ? "Salvando..." : "Salvar Permissões"}
                </Button>
              </div>

              <div className="space-y-4">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center p-3 border rounded-md"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{module.name}</h3>
                      <p className="text-sm text-gray-500">
                        {module.description}
                      </p>
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={hasPermission(module.id)}
                          onChange={() => handlePermissionToggle(module.id)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
