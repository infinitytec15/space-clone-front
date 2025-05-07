"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalQueries: 0,
    averageSessionTime: 0,
    activeClients: 0,
    inactiveClients: 0,
    overdueClients: 0,
    monthlyRevenue: 0,
  });

  const [recentAccesses, setRecentAccesses] = useState([
    {
      id: 1,
      user: "João Silva",
      email: "joao@exemplo.com",
      lastAccess: "2023-06-15T14:30:00",
      location: "São Paulo, SP",
      device: "Desktop - Chrome",
    },
    {
      id: 2,
      user: "Maria Oliveira",
      email: "maria@exemplo.com",
      lastAccess: "2023-06-15T13:45:00",
      location: "Rio de Janeiro, RJ",
      device: "Mobile - Safari",
    },
    {
      id: 3,
      user: "Carlos Mendes",
      email: "carlos@exemplo.com",
      lastAccess: "2023-06-15T12:15:00",
      location: "Belo Horizonte, MG",
      device: "Tablet - Chrome",
    },
    {
      id: 4,
      user: "Ana Souza",
      email: "ana@exemplo.com",
      lastAccess: "2023-06-15T11:20:00",
      location: "Brasília, DF",
      device: "Desktop - Firefox",
    },
    {
      id: 5,
      user: "Paulo Ferreira",
      email: "paulo@exemplo.com",
      lastAccess: "2023-06-15T10:05:00",
      location: "Curitiba, PR",
      device: "Mobile - Chrome",
    },
  ]);

  // Chart data for monthly clients
  const monthlyClientsData = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Novos Clientes",
        data: [65, 78, 90, 85, 99, 125, 150, 160, 180, 190, 210, 250],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
      {
        label: "Clientes Ativos",
        data: [60, 70, 82, 75, 90, 110, 130, 140, 160, 170, 190, 220],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 2,
      },
    ],
  };

  // Chart data for revenue
  const revenueData = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Receita Mensal (R$)",
        data: [
          15000, 17500, 19000, 18500, 22000, 25000, 28000, 30000, 32000, 35000,
          38000, 42000,
        ],
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Simulando carregamento de dados
    // Em produção, isso seria uma chamada de API
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        activeUsers: 487,
        totalQueries: 15680,
        averageSessionTime: 24,
        activeClients: 875,
        inactiveClients: 125,
        overdueClients: 45,
        monthlyRevenue: 42000,
      });
    }, 1000);
  }, []);

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
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard Administrativo
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total de Usuários
            </CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Usuários Ativos
            </CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.activeUsers.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +5% esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total de Consultas
            </CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalQueries.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +18% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tempo Médio de Sessão
            </CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.averageSessionTime} min
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +3% esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Client Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">
              Clientes Ativos
            </CardTitle>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-300">
              {stats.activeClients.toLocaleString()}
            </div>
            <p className="text-sm text-green-700 dark:text-green-400 mt-2">
              {Math.round(
                (stats.activeClients /
                  (stats.activeClients + stats.inactiveClients)) *
                  100,
              )}
              % do total de clientes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Clientes Inativos
            </CardTitle>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-800 dark:text-amber-300">
              {stats.inactiveClients.toLocaleString()}
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
              {Math.round(
                (stats.inactiveClients /
                  (stats.activeClients + stats.inactiveClients)) *
                  100,
              )}
              % do total de clientes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-800 dark:text-red-300">
              Clientes Inadimplentes
            </CardTitle>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
              <Wallet className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-800 dark:text-red-300">
              {stats.overdueClients.toLocaleString()}
            </div>
            <p className="text-sm text-red-700 dark:text-red-400 mt-2">
              {Math.round((stats.overdueClients / stats.activeClients) * 100)}%
              dos clientes ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Clientes por Mês</span>
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar data={monthlyClientsData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Receita Mensal</span>
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line data={revenueData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Access Table */}
      <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
        <CardHeader>
          <CardTitle>Acessos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Usuário</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Último Acesso</th>
                  <th className="px-4 py-3">Localização</th>
                  <th className="px-4 py-3 rounded-tr-lg">Dispositivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentAccesses.map((access) => (
                  <tr
                    key={access.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{access.user}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {access.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatDate(access.lastAccess)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {access.location}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {access.device}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
