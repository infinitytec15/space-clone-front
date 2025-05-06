"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlanSelection from "./PlanSelection";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Plan Selection
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulando registro - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock de registro - em produção, isso seria uma chamada de API real
      // Salvar token de autenticação no localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ email, name, plan: selectedPlan }),
      );
      router.push("/dashboard");
    } catch (err) {
      setError("Ocorreu um erro ao registrar. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          Crie sua conta Space Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {step === 1
            ? "Preencha seus dados para começar"
            : "Escolha o plano ideal para você"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {step === 1 ? (
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nome completo
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
              className="w-full"
            />
          </div>

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

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirmar senha
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <Button
            type="button"
            onClick={nextStep}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Próximo
          </Button>

          <div className="text-center text-sm mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <PlanSelection
            onSelect={(planId) => setSelectedPlan(planId)}
            selectedPlanId={selectedPlan}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Concluir registro"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
