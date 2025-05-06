"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, BarChart3, TrendingUp, Brain, Settings } from "lucide-react";

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: "Cidades",
      href: "/cidades-sociodemografia",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Consumo",
      href: "/potencial-consumo",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Análises",
      href: "/analises-espaciais",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: "Space AI",
      href: "/space-ai",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Gerenciador",
      href: "/space-manager",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white font-bold rounded-md p-1.5 mr-2">
                <span>SD</span>
              </div>
              <span className="text-lg font-semibold">Space Data</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span
                    className={`mr-1.5 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
