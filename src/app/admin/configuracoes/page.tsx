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
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Switch } from "../../../components/ui/switch";
import { Separator } from "../../../components/ui/separator";
import {
  Upload,
  Save,
  Globe,
  Palette,
  Bell,
  Shield,
  Server,
} from "lucide-react";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

export default function ConfiguracoesPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [platformName, setPlatformName] = useState("Space Data");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("pt-BR");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [apiRateLimit, setApiRateLimit] = useState("100");
  const [maxUploadSize, setMaxUploadSize] = useState("10");
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSaveChanges = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    alert("Configurações salvas com sucesso!");
  };

  return (
    <AdminDashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Configurações do Sistema
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gerencie as configurações gerais da plataforma Space Data
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={handleSaveChanges}
          >
            <Save size={16} />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe size={16} />
              Geral
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette size={16} />
              Aparência
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Server size={16} />
              Sistema
            </TabsTrigger>
          </TabsList>

          {/* Configurações Gerais */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Configure as informações básicas da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="platform-name">Nome da Plataforma</Label>
                  <Input
                    id="platform-name"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="language">Idioma Padrão</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="mt-1">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="logo">Logo da Plataforma</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                      {logoFile ? (
                        <img
                          src={URL.createObjectURL(logoFile)}
                          alt="Logo Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">SD</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Upload size={16} />
                        Carregar Logo
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Recomendado: PNG ou SVG, 512x512px
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Aparência */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="theme">Tema Padrão</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme" className="mt-1">
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Cores Primárias</Label>
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {[
                      "#2563EB", // Azul
                      "#10B981", // Verde
                      "#F59E0B", // Amarelo
                      "#EF4444", // Vermelho
                      "#8B5CF6", // Roxo
                    ].map((color) => (
                      <div
                        key={color}
                        className="w-full aspect-square rounded-md cursor-pointer border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Raio de Borda</Label>
                  <div className="grid grid-cols-3 gap-4 mt-1">
                    {[
                      { label: "Nenhum", value: "0px" },
                      { label: "Pequeno", value: "4px" },
                      { label: "Médio", value: "8px" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Notificações */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Configure como as notificações são enviadas aos usuários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-base">
                      Notificações por Email
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enviar notificações por email para os usuários
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="text-base">
                      Notificações Push
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enviar notificações push para os usuários
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Frequência de Resumos</Label>
                  <div className="grid grid-cols-3 gap-4 mt-1">
                    {[
                      { label: "Diário", value: "daily" },
                      { label: "Semanal", value: "weekly" },
                      { label: "Mensal", value: "monthly" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Sistema */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Sistema</CardTitle>
                <CardDescription>
                  Configure parâmetros técnicos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode" className="text-base">
                      Modo de Manutenção
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ativar modo de manutenção (site ficará indisponível)
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debug-mode" className="text-base">
                      Modo de Depuração
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ativar logs detalhados para depuração
                    </p>
                  </div>
                  <Switch
                    id="debug-mode"
                    checked={debugMode}
                    onCheckedChange={setDebugMode}
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="api-rate-limit">
                    Limite de Requisições API (por minuto)
                  </Label>
                  <Input
                    id="api-rate-limit"
                    type="number"
                    value={apiRateLimit}
                    onChange={(e) => setApiRateLimit(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="max-upload-size">
                    Tamanho Máximo de Upload (MB)
                  </Label>
                  <Input
                    id="max-upload-size"
                    type="number"
                    value={maxUploadSize}
                    onChange={(e) => setMaxUploadSize(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="session-timeout">
                    Tempo de Expiração da Sessão (minutos)
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield size={16} />
                  Verificar Segurança do Sistema
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
