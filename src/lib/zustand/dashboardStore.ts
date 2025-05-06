import { create } from "zustand";
import type { CompanyData } from "@/components/dashboard/SidePanel";

type DashboardStore = {
  // SidePanel state
  isSidePanelOpen: boolean;
  selectedCompany: CompanyData | null;
  openSidePanel: (company: CompanyData) => void;
  closeSidePanel: () => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  // SidePanel initial state
  isSidePanelOpen: false,
  selectedCompany: null,

  // SidePanel actions
  openSidePanel: (company) =>
    set({ isSidePanelOpen: true, selectedCompany: company }),
  closeSidePanel: () => set({ isSidePanelOpen: false }),
}));
