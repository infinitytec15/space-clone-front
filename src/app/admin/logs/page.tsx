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
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Search,
  Download,
  Filter,
  FileText,
  Clock,
  User,
  Activity,
  Info,
  Globe,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RefreshCw,
} from "lucide-react";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

interface LogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for logs
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      userId: "101",
      userName: "João Silva",
      action: "login",
      details: "Login bem-sucedido",
      ipAddress: "187.122.45.67",
      timestamp: "2023-06-15T14:30:00",
    },
    {
      id: "2",
      userId: "102",
      userName: "Maria Oliveira",
      action: "export",
      details: "Exportação de relatório de análise demográfica",
      ipAddress: "201.45.78.90",
      timestamp: "2023-06-15T13:45:00",
    },
    {
      id: "3",
      userId: "103",
      userName: "Carlos Mendes",
      action: "update",
      details: "Atualização de perfil",
      ipAddress: "189.54.120.34",
      timestamp: "2023-06-15T12:15:00",
    },
    {
      id: "4",
      userId: "104",
      userName: "Ana Souza",
      action: "api",
      details: "Chamada de API para dados geoespaciais",
      ipAddress: "177.98.65.43",
      timestamp: "2023-06-15T11:20:00",
    },
    {
      id: "5",
      userId: "105",
      userName: "Paulo Ferreira",
      action: "login",
      details: "Login bem-sucedido",
      ipAddress: "200.178.45.12",
      timestamp: "2023-06-15T10:05:00",
    },
    {
      id: "6",
      userId: "101",
      userName: "João Silva",
      action: "logout",
      details: "Logout do sistema",
      ipAddress: "187.122.45.67",
      timestamp: "2023-06-15T16:45:00",
    },
    {
      id: "7",
      userId: "106",
      userName: "Fernanda Lima",
      action: "payment",
      details: "Pagamento de assinatura",
      ipAddress: "189.45.78.123",
      timestamp: "2023-06-14T09:30:00",
    },
    {
      id: "8",
      userId: "107",
      userName: "Roberto Alves",
      action: "update",
      details: "Alteração de plano de assinatura",
      ipAddress: "201.67.89.34",
      timestamp: "2023-06-14T14:20:00",
    },
    {
      id: "9",
      userId: "108",
      userName: "Camila Santos",
      action: "api",
      details: "Chamada de API para análise de dados",
      ipAddress: "177.45.67.89",
      timestamp: "2023-06-13T11:15:00",
    },
    {
      id: "10",
      userName: "Admin",
      userId: "1",
      action: "system",
      details: "Backup do sistema realizado",
      ipAddress: "localhost",
      timestamp: "2023-06-13T03:00:00",
    },
  ];

  // Filter logs based on search term and filters
  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction =
      selectedAction === "all" || log.action === selectedAction;

    // Filter by period
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    let matchesPeriod = false;
    switch (selectedPeriod) {
      case "24hours":
        matchesPeriod = daysDiff < 1;
        break;
      case "7days":
        matchesPeriod = daysDiff < 7;
        break;
      case "30days":
        matchesPeriod = daysDiff < 30;
        break;
      case "all":
        matchesPeriod = true;
        break;
    }

    return matchesSearch && matchesAction && matchesPeriod;
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

  // Get action badge color
  const getActionColor = (action: string) => {
    switch (action) {
      case "login":
        return "bg-green-100 text-green-800 border-green-200";
      case "logout":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "update":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "export":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "api":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "payment":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "system":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get action icon
  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <User size={14} className="mr-1" />;
      case "logout":
        return <User size={14} className="mr-1" />;
      case "update":
        return <RefreshCw size={14} className="mr-1" />;
      case "export":
        return <Download size={14} className="mr-1" />;
      case "api":
        return <Globe size={14} className="mr-1" />;
      case "payment":
        return <Activity size={14} className="mr-1" />;
      case "system":
        return <Info size={14} className="mr-1" />;
      default:
        return <Info size={14} className="mr-1" />;
    }
  };

  const handleRefreshLogs = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <AdminDashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Logs e Auditoria
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Monitore as atividades dos usuários e do sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefreshLogs}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              {isRefreshing ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
              ) : (
                <RefreshCw size={16} />
              )}
              {isRefreshing ? "Atualizando..." : "Atualizar"}
            </Button>
            <Button className="flex items-center gap-2">
              <Download size={16} />
              Exportar Logs
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4 w-full md:w-auto">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText size={16} />
              Todos
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Info size={16} />
              Sistema
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User size={16} />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Activity size={16} />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter size={18} />
                  Filtros
                </CardTitle>
                <CardDescription>
                  Refine os logs por período, tipo de ação ou busca por texto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      placeholder="Buscar por usuário, ação ou detalhes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedAction}
                    onValueChange={setSelectedAction}
                  >
                    <SelectTrigger className="flex items-center">
                      <Activity size={16} className="mr-2 text-gray-500" />
                      <SelectValue placeholder="Tipo de Ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Ações</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="update">Atualização</SelectItem>
                      <SelectItem value="export">Exportação</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="payment">Pagamento</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <SelectTrigger className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24hours">Últimas 24 horas</SelectItem>
                      <SelectItem value="7days">Últimos 7 dias</SelectItem>
                      <SelectItem value="30days">Últimos 30 dias</SelectItem>
                      <SelectItem value="all">Todo o período</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText size={18} />
                  Registros de Atividade
                </CardTitle>
                <CardDescription>
                  {filteredLogs.length} registros encontrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            Data/Hora
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            Usuário
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Activity size={14} />
                            Ação
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Info size={14} />
                            Detalhes
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Globe size={14} />
                            IP
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredLogs.map((log) => (
                        <tr
                          key={log.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm">
                            {formatDate(log.timestamp)}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">
                            {log.userName}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}
                            >
                              {getActionIcon(log.action)}
                              {log.action.charAt(0).toUpperCase() +
                                log.action.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{log.details}</td>
                          <td className="py-3 px-4 text-sm font-mono">
                            {log.ipAddress}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Mostrando {filteredLogs.length} de {mockLogs.length} registros
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    Próximo
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-40 text-gray-500">
                  <div className="text-center">
                    <Info size={40} className="mx-auto mb-2 opacity-30" />
                    <p>Selecione "Todos" para visualizar os logs do sistema</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-40 text-gray-500">
                  <div className="text-center">
                    <User size={40} className="mx-auto mb-2 opacity-30" />
                    <p>Selecione "Todos" para visualizar os logs de usuários</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-40 text-gray-500">
                  <div className="text-center">
                    <Activity size={40} className="mx-auto mb-2 opacity-30" />
                    <p>
                      Selecione "Todos" para visualizar os logs de segurança
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
