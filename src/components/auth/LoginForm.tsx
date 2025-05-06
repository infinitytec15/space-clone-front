"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulando autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock de autenticação - em produção, isso seria uma chamada de API real
      if (email === "admin@spacedata.com" && password === "password") {
        // Salvar token de autenticação no localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ email, name: "Administrador" }),
        );
        router.push("/dashboard");
      } else {
        setError("Credenciais inválidas. Tente admin@spacedata.com / password");
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          Acesso ao Space Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Entre com suas credenciais para acessar o dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Senha
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Lembrar-me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>

        <div className="text-center text-sm mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
