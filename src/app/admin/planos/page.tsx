"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Check,
  X,
  Users,
  CreditCard,
  Tag,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

interface Plan {
  id: string;
  name: string;
  price: number;
  usageLimit: string;
  features: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  startDate: string;
  paymentStatus: "up-to-date" | "overdue";
  planId: string;
}

export default function PlansManagementPage() {
  // Mock data for plans
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Básico",
      price: 99.9,
      usageLimit: "5 usuários",
      features: ["Dashboard", "Análises Básicas"],
    },
    {
      id: "2",
      name: "Profissional",
      price: 199.9,
      usageLimit: "15 usuários",
      features: ["Dashboard", "Análises Avançadas", "Exportação de Dados"],
    },
    {
      id: "3",
      name: "Enterprise",
      price: 499.9,
      usageLimit: "Usuários ilimitados",
      features: [
        "Dashboard",
        "Análises Avançadas",
        "Exportação de Dados",
        "API Access",
        "Suporte Prioritário",
      ],
    },
  ]);

  // Mock data for users
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@exemplo.com",
      status: "active",
      startDate: "2023-01-15",
      paymentStatus: "up-to-date",
      planId: "1",
    },
    {
      id: "2",
      name: "Maria Souza",
      email: "maria@exemplo.com",
      status: "active",
      startDate: "2023-02-20",
      paymentStatus: "up-to-date",
      planId: "2",
    },
    {
      id: "3",
      name: "Carlos Ferreira",
      email: "carlos@exemplo.com",
      status: "inactive",
      startDate: "2023-03-10",
      paymentStatus: "overdue",
      planId: "3",
    },
  ]);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState<Omit<Plan, "id">>({
    name: "",
    price: 0,
    usageLimit: "",
    features: [],
  });

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
    if (selectedPlan === planId) {
      setSelectedPlan(null);
    }
  };

  const handleCreatePlan = () => {
    const id = (plans.length + 1).toString();
    setPlans([...plans, { id, ...newPlan }]);
    setNewPlan({ name: "", price: 0, usageLimit: "", features: [] });
    setIsCreatingPlan(false);
  };

  const handleEditPlan = (plan: Plan) => {
    setNewPlan({
      name: plan.name,
      price: plan.price,
      usageLimit: plan.usageLimit,
      features: plan.features,
    });
    setEditingPlanId(plan.id);
    setIsEditingPlan(true);
  };

  const handleSaveEditedPlan = () => {
    if (editingPlanId) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlanId ? { ...plan, ...newPlan } : plan,
        ),
      );
      setNewPlan({ name: "", price: 0, usageLimit: "", features: [] });
      setIsEditingPlan(false);
      setEditingPlanId(null);
    }
  };

  const filteredUsers = selectedPlan
    ? users.filter((user) => user.planId === selectedPlan)
    : [];

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case "1":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
      case "2":
        return "bg-purple-50 border-purple-200 hover:bg-purple-100";
      case "3":
        return "bg-emerald-50 border-emerald-200 hover:bg-emerald-100";
      default:
        return "bg-gray-50 border-gray-200 hover:bg-gray-100";
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Gestão de Planos e Assinaturas
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gerencie os planos disponíveis e visualize os usuários associados
            </p>
          </div>
          <Button
            onClick={() => setIsCreatingPlan(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Novo Plano
          </Button>
        </div>

        {/* Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer border-2 transition-all ${getPlanColor(plan.id)} ${selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <Badge
                    variant={plan.id === "3" ? "default" : "secondary"}
                    className="mb-2"
                  >
                    {plan.id === "1"
                      ? "Básico"
                      : plan.id === "2"
                        ? "Recomendado"
                        : "Premium"}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditPlan(plan);
                      }}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlan(plan.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold">
                    R$ {plan.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users size={16} className="mr-2" />
                  <span>{plan.usageLimit}</span>
                </div>
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check size={16} className="mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        {selectedPlan && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users size={20} />
                Usuários com o plano{" "}
                {plans.find((p) => p.id === selectedPlan)?.name}
              </CardTitle>
              <CardDescription>
                {filteredUsers.length} usuários encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Data de Início
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Pagamento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "outline"
                                  : "secondary"
                              }
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {user.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {new Date(user.startDate).toLocaleDateString(
                              "pt-BR",
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge
                              variant={
                                user.paymentStatus === "up-to-date"
                                  ? "outline"
                                  : "secondary"
                              }
                              className={
                                user.paymentStatus === "up-to-date"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {user.paymentStatus === "up-to-date"
                                ? "Em dia"
                                : "Atrasado"}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          Nenhum usuário encontrado para este plano.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create New Plan Dialog */}
        <Dialog open={isCreatingPlan} onOpenChange={setIsCreatingPlan}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Plano</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do novo plano de assinatura.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nome do Plano</label>
                <Input
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                  placeholder="Ex: Plano Premium"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Preço Mensal (R$)</label>
                <Input
                  type="number"
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      price: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Ex: 199.90"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Limite de Uso</label>
                <Input
                  value={newPlan.usageLimit}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, usageLimit: e.target.value })
                  }
                  placeholder="Ex: 10 usuários"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Recursos (separados por vírgula)
                </label>
                <Input
                  value={newPlan.features.join(", ")}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      features: e.target.value.split(",").map((f) => f.trim()),
                    })
                  }
                  placeholder="Ex: Dashboard, Análises Avançadas, API Access"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreatingPlan(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreatePlan}>Criar Plano</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Plan Dialog */}
        <Dialog open={isEditingPlan} onOpenChange={setIsEditingPlan}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Plano</DialogTitle>
              <DialogDescription>
                Atualize os detalhes do plano de assinatura.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nome do Plano</label>
                <Input
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Preço Mensal (R$)</label>
                <Input
                  type="number"
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Limite de Uso</label>
                <Input
                  value={newPlan.usageLimit}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, usageLimit: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Recursos (separados por vírgula)
                </label>
                <Input
                  value={newPlan.features.join(", ")}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      features: e.target.value.split(",").map((f) => f.trim()),
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditingPlan(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEditedPlan}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
