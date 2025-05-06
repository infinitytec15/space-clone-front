import dynamic from "next/dynamic";

const DashboardClient = dynamic(
  () => import("@/components/dashboard/DashboardClient"),
  {
    ssr: false,
  },
);

export default function Dashboard() {
  return <DashboardClient />;
}
