import { create } from "zustand";

// Tipos para as áreas selecionadas
export type SelectedArea = {
  id: string;
  name: string;
  type: "circle" | "polygon" | "radius";
  coordinates: any; // Coordenadas específicas baseadas no tipo
  color: string;
};

// Tipos para os filtros
export type SpatialFilters = {
  period: {
    month: number;
    year: number;
  };
  dataType: "demografia" | "consumo" | "mobilidade" | "empresas";
  compareMode: boolean;
};

// Interface do estado
interface SpatialAnalysisState {
  // Estado
  selectedAreas: SelectedArea[];
  filters: SpatialFilters;
  activeDrawingTool: "circle" | "polygon" | "radius" | null;
  isDrawing: boolean;

  // Ações
  addSelectedArea: (area: SelectedArea) => void;
  removeSelectedArea: (id: string) => void;
  clearSelectedAreas: () => void;
  updateFilters: (filters: Partial<SpatialFilters>) => void;
  setActiveDrawingTool: (tool: "circle" | "polygon" | "radius" | null) => void;
  setIsDrawing: (isDrawing: boolean) => void;
}

export const useSpatialAnalysisStore = create<SpatialAnalysisState>((set) => ({
  // Estado inicial
  selectedAreas: [],
  filters: {
    period: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    dataType: "demografia",
    compareMode: false,
  },
  activeDrawingTool: null,
  isDrawing: false,

  // Ações
  addSelectedArea: (area) =>
    set((state) => ({
      selectedAreas: [...state.selectedAreas, area],
    })),

  removeSelectedArea: (id) =>
    set((state) => ({
      selectedAreas: state.selectedAreas.filter((area) => area.id !== id),
    })),

  clearSelectedAreas: () =>
    set({
      selectedAreas: [],
    }),

  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  setActiveDrawingTool: (tool) =>
    set({
      activeDrawingTool: tool,
    }),

  setIsDrawing: (isDrawing) =>
    set({
      isDrawing,
    }),
}));
