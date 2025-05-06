"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Upload, MapPin } from "lucide-react";

interface Point {
  id: string;
  name: string;
  category: string;
  notes?: string;
  coordinates: [number, number]; // [longitude, latitude]
  imageUrl?: string;
}

interface PointFormProps {
  point?: Point | null;
  onSave: (point: Point) => void;
  onCancel: () => void;
  categories?: string[];
}

export default function PointForm({
  point,
  onSave,
  onCancel,
  categories = [],
}: PointFormProps) {
  const defaultCategories = [
    "Comércio",
    "Residencial",
    "Industrial",
    "Serviços",
    "Lazer",
    "Outro",
  ];
  const allCategories = [...new Set([...defaultCategories, ...categories])];

  const [formData, setFormData] = useState<Omit<Point, "id"> & { id?: string }>(
    point || {
      name: "",
      category: "Outro",
      notes: "",
      coordinates: [-46.6333, -23.5505], // Default to São Paulo
    },
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    point?.imageUrl || null,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });

    // Clear error when field is edited
    if (errors.category) {
      setErrors({ ...errors, category: "" });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // In a real app, you would upload the image to a server here
    // and get back a URL to store in the point data
    const imageUrl = imagePreview || formData.imageUrl;

    onSave({
      id: formData.id || `point-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      notes: formData.notes,
      coordinates: formData.coordinates,
      imageUrl,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{point ? "Editar Ponto" : "Novo Ponto"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do ponto"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                className={errors.category ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-destructive text-xs">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              placeholder="Observações sobre este ponto"
              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagem</Label>
            <div className="flex items-center space-x-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="bg-secondary text-secondary-foreground h-9 px-4 rounded-md inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-secondary/80">
                  <Upload className="h-4 w-4 mr-2" />
                  Escolher arquivo
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-sm text-muted-foreground">
                {imageFile?.name ||
                  (imagePreview
                    ? "Imagem selecionada"
                    : "Nenhum arquivo selecionado")}
              </span>
            </div>

            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-48 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Coordenadas</Label>
            <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Lat: {formData.coordinates[1].toFixed(6)}, Lng:{" "}
                {formData.coordinates[0].toFixed(6)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Coordenadas definidas pela posição no mapa
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{point ? "Atualizar" : "Criar"} Ponto</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
