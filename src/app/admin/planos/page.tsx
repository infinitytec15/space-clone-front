"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

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

  const filteredUsers = selectedPlan
    ? users.filter((user) => user.planId === selectedPlan)
    : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Gestão de Planos e Assinaturas
      </h1>

      {/* Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer ${selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                R$ {plan.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Limite: {plan.usageLimit}
              </div>
              <div className="space-y-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="text-sm">
                    ✓ {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Plan Card */}
        <Card
          className="border-dashed border-2 flex items-center justify-center cursor-pointer h-full"
          onClick={() => setIsCreatingPlan(true)}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Plus size={24} className="mb-2" />
            <span>Adicionar Novo Plano</span>
          </CardContent>
        </Card>
      </div>

      {/* Create New Plan Form */}
      {isCreatingPlan && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Criar Novo Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome do Plano
                </label>
                <Input
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Preço Mensal (R$)
                </label>
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Limite de Uso
                </label>
                <Input
                  value={newPlan.usageLimit}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, usageLimit: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsCreatingPlan(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePlan}>Criar Plano</Button>
          </CardFooter>
        </Card>
      )}

      {/* Users Table */}
      {selectedPlan && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Usuários com o plano{" "}
            {plans.find((p) => p.id === selectedPlan)?.name}
          </h2>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Data de Início</th>
                  <th className="px-4 py-2 text-left">Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {user.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(user.startDate).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${user.paymentStatus === "up-to-date" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {user.paymentStatus === "up-to-date"
                            ? "Em dia"
                            : "Atrasado"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      Nenhum usuário encontrado para este plano.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
