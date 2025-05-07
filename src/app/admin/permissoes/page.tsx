"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Shield, Save, Lock, CheckCircle, AlertCircle } from "lucide-react";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

interface Plan {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
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
      icon: "layout",
    },
    {
      id: "2",
      name: "Consumo",
      description: "Análise de dados de consumo",
      icon: "bar-chart",
    },
    {
      id: "3",
      name: "AI",
      description: "Recursos de inteligência artificial",
      icon: "brain",
    },
    {
      id: "4",
      name: "Analytics",
      description: "Análises avançadas e relatórios",
      icon: "line-chart",
    },
    {
      id: "5",
      name: "Exportação",
      description: "Exportação de dados em diversos formatos",
      icon: "download",
    },
    {
      id: "6",
      name: "API",
      description: "Acesso à API para integração",
      icon: "code",
    },
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
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    setSaveSuccess(false);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const hasPermission = (moduleId: string) => {
    return permissions.some(
      (p) => p.planId === selectedPlan && p.moduleId === moduleId,
    );
  };

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "layout":
        return (
          <div className="p-2 bg-blue-100 rounded-md">
            <Shield size={20} className="text-blue-600" />
          </div>
        );
      case "bar-chart":
        return (
          <div className="p-2 bg-purple-100 rounded-md">
            <Shield size={20} className="text-purple-600" />
          </div>
        );
      case "brain":
        return (
          <div className="p-2 bg-emerald-100 rounded-md">
            <Shield size={20} className="text-emerald-600" />
          </div>
        );
      case "line-chart":
        return (
          <div className="p-2 bg-amber-100 rounded-md">
            <Shield size={20} className="text-amber-600" />
          </div>
        );
      case "download":
        return (
          <div className="p-2 bg-pink-100 rounded-md">
            <Shield size={20} className="text-pink-600" />
          </div>
        );
      case "code":
        return (
          <div className="p-2 bg-indigo-100 rounded-md">
            <Shield size={20} className="text-indigo-600" />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-md">
            <Shield size={20} className="text-gray-600" />
          </div>
        );
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Permissões por Plano
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Configure quais recursos estão disponíveis para cada plano de
              assinatura
            </p>
          </div>
          <Button
            onClick={handleSavePermissions}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Salvar Permissões</span>
              </>
            )}
          </Button>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
            <CheckCircle size={18} className="mr-2" />
            Permissões salvas com sucesso!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Plans Tabs */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock size={18} />
                  Planos
                </CardTitle>
                <CardDescription>
                  Selecione um plano para configurar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors flex items-center justify-between ${selectedPlan === plan.id ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : "hover:bg-gray-100 dark:hover:bg-gray-800/50"}`}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      <div className="flex items-center">
                        <Shield
                          size={18}
                          className={
                            selectedPlan === plan.id
                              ? "text-blue-600 mr-2"
                              : "text-gray-500 mr-2"
                          }
                        />
                        {plan.name}
                      </div>
                      {selectedPlan === plan.id && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          Selecionado
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modules Permissions */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield size={18} />
                      Módulos para o plano:{" "}
                      {plans.find((p) => p.id === selectedPlan)?.name}
                    </CardTitle>
                    <CardDescription>
                      Ative ou desative o acesso aos módulos para este plano
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="mr-4">{getModuleIcon(module.icon)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{module.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {module.description}
                        </p>
                      </div>
                      <div>
                        <Switch
                          checked={hasPermission(module.id)}
                          onCheckedChange={() =>
                            handlePermissionToggle(module.id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-gray-500 flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  As alterações serão aplicadas após salvar
                </div>
                <Button
                  onClick={handleSavePermissions}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
