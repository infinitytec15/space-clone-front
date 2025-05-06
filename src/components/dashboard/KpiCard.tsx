"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  color?: string;
}

const KpiCard = ({
  title,
  value,
  change,
  icon,
  color = "bg-gradient-to-br from-blue-50 to-blue-100",
}: KpiCardProps) => {
  const getTrendColor = () => {
    switch (change.trend) {
      case "up":
        return "text-emerald-500";
      case "down":
        return "text-rose-500";
      default:
        return "text-slate-500";
    }
  };

  const getIconBgColor = () => {
    switch (change.trend) {
      case "up":
        return "bg-emerald-100";
      case "down":
        return "bg-rose-100";
      default:
        return "bg-slate-100";
    }
  };

  return (
    <Card className={`overflow-hidden shadow-md border ${color} h-full`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-700">
          {title}
        </CardTitle>
        <div
          className={`h-9 w-9 rounded-full ${getIconBgColor()} p-1.5 text-slate-700 shadow-sm flex items-center justify-center`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        <div className="flex items-center text-xs mt-2">
          {change.trend === "up" && (
            <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
          )}
          {change.trend === "down" && (
            <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
          )}
          <span className={`${getTrendColor()} font-medium`}>
            {change.value}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
