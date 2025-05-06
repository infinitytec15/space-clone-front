"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Simular carregamento de dados do usuário do localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUserData(JSON.parse(userStr));
        } catch (e) {
          console.error("Erro ao carregar dados do usuário", e);
        }
      }
    }
  });

  const handleLogout = () => {
    setIsLoading(true);

    // Simular um pequeno delay para feedback visual
    setTimeout(() => {
      // Remover dados de autenticação do localStorage
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");

      // Redirecionar para a página de login
      router.push("/login");
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Minha Conta</h1>
      <p className="text-gray-600 mb-6">
        Gerencie suas informações pessoais, preferências e configurações da
        conta.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais e de contato.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                defaultValue={userData?.name || "Administrador"}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={userData?.email || "admin@spacedata.com"}
                disabled
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>
              Editar Perfil
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>
              Gerencie suas configurações de segurança e acesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value="••••••••" disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled className="mr-2">
              Alterar Senha
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Sessão</CardTitle>
            <CardDescription>
              Gerencie sua sessão atual no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Ao fazer logout, você será redirecionado para a página de login e
              precisará inserir suas credenciais novamente para acessar o
              sistema.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Saindo..." : "Sair do Sistema"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
