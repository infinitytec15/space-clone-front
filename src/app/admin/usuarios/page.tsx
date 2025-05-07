"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "blocked";
  role: string;
  lastLogin: string;
  registrationDate: string;
};

export default function UserManagementPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@exemplo.com",
      status: "active",
      role: "Usuário",
      lastLogin: "2023-06-15T14:30:00",
      registrationDate: "2023-01-10T09:15:00",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria@exemplo.com",
      status: "active",
      role: "Usuário Premium",
      lastLogin: "2023-06-15T13:45:00",
      registrationDate: "2023-02-22T11:30:00",
    },
    {
      id: 3,
      name: "Carlos Mendes",
      email: "carlos@exemplo.com",
      status: "blocked",
      role: "Usuário",
      lastLogin: "2023-06-10T12:15:00",
      registrationDate: "2023-01-05T14:20:00",
    },
    {
      id: 4,
      name: "Ana Souza",
      email: "ana@exemplo.com",
      status: "active",
      role: "Usuário Premium",
      lastLogin: "2023-06-14T11:20:00",
      registrationDate: "2023-03-15T10:45:00",
    },
    {
      id: 5,
      name: "Paulo Ferreira",
      email: "paulo@exemplo.com",
      status: "active",
      role: "Usuário",
      lastLogin: "2023-06-13T10:05:00",
      registrationDate: "2023-02-18T09:30:00",
    },
    {
      id: 6,
      name: "Fernanda Lima",
      email: "fernanda@exemplo.com",
      status: "active",
      role: "Usuário Premium",
      lastLogin: "2023-06-12T15:20:00",
      registrationDate: "2023-04-05T08:30:00",
    },
    {
      id: 7,
      name: "Roberto Alves",
      email: "roberto@exemplo.com",
      status: "blocked",
      role: "Usuário",
      lastLogin: "2023-06-08T09:45:00",
      registrationDate: "2023-01-20T13:15:00",
    },
  ]);

  const handleViewProfile = (userId: number) => {
    const user = users.find((u) => u.id === userId) || null;
    setSelectedUser(user);
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    handleCloseModal();
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((user) => user.id !== userId));
      if (selectedUserId === userId) {
        handleCloseModal();
      }
    }
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user,
      ),
    );

    // Update the selected user if it's currently being viewed
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        status: selectedUser.status === "active" ? "blocked" : "active",
      });
    }
  };

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gerenciamento de Usuários
          </h1>
          <p className="text-muted-foreground">
            Gerencie os usuários da plataforma, visualize detalhes e altere
            permissões.
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <UserPlus size={16} />
          <span>Adicionar Usuário</span>
        </Button>
      </div>

      <Card className="border-none shadow-md bg-white dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle>Usuários</CardTitle>
          <CardDescription>
            Total de {filteredUsers.length} usuários encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="blocked">Bloqueados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Usuário">Usuário</SelectItem>
                    <SelectItem value="Usuário Premium">
                      Usuário Premium
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Perfil</th>
                  <th className="px-4 py-3">Último Acesso</th>
                  <th className="px-4 py-3">Data de Registro</th>
                  <th className="px-4 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}
                        >
                          {user.status === "active" ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ativo
                            </>
                          ) : (
                            <>
                              <Ban className="w-3 h-3 mr-1" />
                              Bloqueado
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {user.role}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {formatDate(user.registrationDate)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                            onClick={() => handleViewProfile(user.id)}
                            title="Editar"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                            onClick={() => handleToggleStatus(user.id)}
                            title={
                              user.status === "active"
                                ? "Bloquear"
                                : "Desbloquear"
                            }
                          >
                            <Ban size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewProfile(user.id)}
                              >
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(`Enviando email para ${user.email}...`)
                                }
                              >
                                Enviar email
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(
                                    `Redefinindo senha para ${user.name}...`,
                                  )
                                }
                              >
                                Redefinir senha
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando{" "}
              <span className="font-medium">{filteredUsers.length}</span> de{" "}
              <span className="font-medium">{users.length}</span> usuários
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Profile Modal would be imported from UserProfileModal component */}
    </div>
  );
}
