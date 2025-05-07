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
import { BookOpen, Edit, Plus, Search, Trash2 } from "lucide-react";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

interface EducationalContent {
  id: string;
  title: string;
  type: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function EducationalContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for educational content
  const mockEducationalContent: EducationalContent[] = [
    {
      id: "1",
      title: "Introdução à Análise Geoespacial",
      type: "article",
      category: "basics",
      status: "published",
      createdAt: "2023-10-15",
      updatedAt: "2023-10-20",
    },
    {
      id: "2",
      title: "Como Interpretar Mapas de Calor",
      type: "video",
      category: "intermediate",
      status: "published",
      createdAt: "2023-09-05",
      updatedAt: "2023-09-10",
    },
    {
      id: "3",
      title: "Técnicas Avançadas de Análise Demográfica",
      type: "course",
      category: "advanced",
      status: "draft",
      createdAt: "2023-11-01",
      updatedAt: "2023-11-05",
    },
    {
      id: "4",
      title: "Guia de Uso da Plataforma Space Data",
      type: "guide",
      category: "basics",
      status: "published",
      createdAt: "2023-08-20",
      updatedAt: "2023-08-25",
    },
    {
      id: "5",
      title: "Webinar: Tendências em Análise de Dados Espaciais",
      type: "webinar",
      category: "intermediate",
      status: "scheduled",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-01",
    },
  ];

  // Filter content based on search term and filters
  const filteredContent = mockEducationalContent.filter((content) => {
    const matchesSearch = content.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || content.category === selectedCategory;
    const matchesType = selectedType === "all" || content.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || content.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Gerenciamento de Conteúdo Educacional
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gerencie artigos, vídeos, cursos e outros materiais educacionais
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Novo Conteúdo
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Refine a lista de conteúdos educacionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Buscar por título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="basics">Básico</SelectItem>
                  <SelectItem value="intermediate">Intermediário</SelectItem>
                  <SelectItem value="advanced">Avançado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="article">Artigo</SelectItem>
                  <SelectItem value="video">Vídeo</SelectItem>
                  <SelectItem value="course">Curso</SelectItem>
                  <SelectItem value="guide">Guia</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdos Educacionais</CardTitle>
            <CardDescription>
              {filteredContent.length} conteúdos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Título</th>
                    <th className="text-left py-3 px-4">Tipo</th>
                    <th className="text-left py-3 px-4">Categoria</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Última Atualização</th>
                    <th className="text-right py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((content) => (
                    <tr
                      key={content.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <BookOpen
                            size={20}
                            className="text-blue-600 dark:text-blue-400"
                          />
                          <span>{content.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize">{content.type}</td>
                      <td className="py-3 px-4 capitalize">
                        {content.category}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            content.status,
                          )}`}
                        >
                          {content.status === "published"
                            ? "Publicado"
                            : content.status === "draft"
                              ? "Rascunho"
                              : "Agendado"}
                        </span>
                      </td>
                      <td className="py-3 px-4">{content.updatedAt}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {filteredContent.length} de{" "}
              {mockEducationalContent.length} conteúdos
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
