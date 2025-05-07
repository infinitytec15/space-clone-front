"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  Lock,
  BookOpen,
  FileText,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo usuário registrado",
      message: "João Silva acabou de se registrar na plataforma.",
      time: "5 minutos atrás",
      read: false,
    },
    {
      id: "2",
      title: "Pagamento recebido",
      message: "Pagamento de R$ 199,90 recebido de Maria Oliveira.",
      time: "1 hora atrás",
      read: false,
    },
    {
      id: "3",
      title: "Alerta de sistema",
      message: "Backup automático concluído com sucesso.",
      time: "3 horas atrás",
      read: true,
    },
    {
      id: "4",
      title: "Novo relatório disponível",
      message: "O relatório mensal de junho está disponível para download.",
      time: "1 dia atrás",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    // Verificar se o usuário admin está autenticado
    const checkAuth = () => {
      try {
        const auth = localStorage.getItem("isAdminAuthenticated");
        if (!auth) {
          router.push("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAdminAuthenticated");
      localStorage.removeItem("adminUser");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      router.push("/admin/login");
    }
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-blue-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900">
      {/* Sidebar para desktop */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} hidden md:block bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SD</span>
            </div>
            {isSidebarOpen && (
              <span className="ml-3 font-semibold text-gray-800 dark:text-white">
                Space Data Admin
              </span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <div className="px-4 py-2">
          {isSidebarOpen && (
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Buscar..."
                className="pl-9 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm"
              />
            </div>
          )}
        </div>
        <nav className="mt-2">
          <div className="px-2 space-y-1">
            <NavItem
              href="/admin"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              isOpen={isSidebarOpen}
            />
            <NavItem
              href="/admin/usuarios"
              icon={<Users size={20} />}
              label="Usuários"
              isOpen={isSidebarOpen}
            />
            <NavItem
              href="/admin/planos"
              icon={<CreditCard size={20} />}
              label="Planos"
              isOpen={isSidebarOpen}
            />
            <NavItem
              href="/admin/permissoes"
              icon={<Lock size={20} />}
              label="Permissões"
              isOpen={isSidebarOpen}
            />
            <NavItem
              href="/admin/educacao"
              icon={<BookOpen size={20} />}
              label="Educação"
              isOpen={isSidebarOpen}
            />
            <NavItem
              href="/admin/configuracoes"
              icon={<Settings size={20} />}
              label="Configurações"
              isOpen={isSidebarOpen}
            />
            <NavItem
              href="/admin/logs"
              icon={<FileText size={20} />}
              label="Logs"
              isOpen={isSidebarOpen}
            />
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${!isSidebarOpen ? "justify-center" : ""}`}
            >
              <LogOut size={20} className="text-red-500" />
              {isSidebarOpen && <span className="ml-3">Sair</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <span className="ml-3 font-semibold text-gray-800 dark:text-white">
                Space Data Admin
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-4 py-2">
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Buscar..."
                className="pl-9 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm"
              />
            </div>
          </div>
          <nav className="mt-2">
            <div className="px-2 space-y-1">
              <NavItem
                href="/admin"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                isOpen={true}
              />
              <NavItem
                href="/admin/usuarios"
                icon={<Users size={20} />}
                label="Usuários"
                isOpen={true}
              />
              <NavItem
                href="/admin/planos"
                icon={<CreditCard size={20} />}
                label="Planos"
                isOpen={true}
              />
              <NavItem
                href="/admin/permissoes"
                icon={<Lock size={20} />}
                label="Permissões"
                isOpen={true}
              />
              <NavItem
                href="/admin/educacao"
                icon={<BookOpen size={20} />}
                label="Educação"
                isOpen={true}
              />
              <NavItem
                href="/admin/configuracoes"
                icon={<Settings size={20} />}
                label="Configurações"
                isOpen={true}
              />
              <NavItem
                href="/admin/logs"
                icon={<FileText size={20} />}
                label="Logs"
                isOpen={true}
              />
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={20} className="text-red-500" />
                <span className="ml-3">Sair</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu size={24} />
              </button>
              <span className="ml-3 font-semibold text-gray-800 dark:text-white">
                Space Data Admin
              </span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Space Data Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 relative"
                >
                  <Bell
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Notificações
                      </h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Marcar todas como lidas
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          Nenhuma notificação
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Ver todas as notificações
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Admin
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@spacedata.com.br
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className="ml-1 text-gray-500 dark:text-gray-400 hidden md:block"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

function NavItem({ href, icon, label, isOpen }: NavItemProps) {
  const router = useRouter();
  const isActive =
    typeof window !== "undefined" && window.location.pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${!isOpen ? "justify-center" : ""} ${
        isActive
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
      }`}
    >
      <span className={isActive ? "text-blue-600 dark:text-blue-400" : ""}>
        {icon}
      </span>
      {isOpen && <span className="ml-3">{label}</span>}
    </Link>
  );
}
