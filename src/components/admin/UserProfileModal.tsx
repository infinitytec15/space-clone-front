"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "blocked";
  role: string;
  lastLogin: string;
  registrationDate: string;
};

type UserProfileModalProps = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  onDelete: (userId: number) => void;
  onToggleStatus: (userId: number) => void;
};

export default function UserProfileModal({
  user,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onToggleStatus,
}: UserProfileModalProps) {
  const [editedUser, setEditedUser] = useState<User | null>(null);

  // Initialize editedUser when user changes
  useState(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  });

  if (!user || !editedUser) {
    return null;
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
    }
  };

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Perfil do Usuário</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={editedUser.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={editedUser.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Tipo
            </Label>
            <Select
              value={editedUser.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Usuário">Usuário</SelectItem>
                <SelectItem value="Usuário Premium">Usuário Premium</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <div className="col-span-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  editedUser.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {editedUser.status === "active" ? "Ativo" : "Bloqueado"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Último Acesso</Label>
            <div className="col-span-3">{formatDate(editedUser.lastLogin)}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Data de Registro</Label>
            <div className="col-span-3">
              {formatDate(editedUser.registrationDate)}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onToggleStatus(user.id)}
              className={
                editedUser.status === "active"
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {editedUser.status === "active" ? "Bloquear" : "Desbloquear"}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(user.id)}>
              Excluir
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
