"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";

interface ConsumptionDataTableProps {
  data: {
    headers: string[];
    rows: Array<Array<string | number>>;
  } | null;
  loading?: boolean;
  title?: string;
}

export default function ConsumptionDataTable({
  data,
  loading = false,
  title = "Tabela de Dados de Consumo",
}: ConsumptionDataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.rows.length / rowsPerPage) : 0;

  // Get current rows
  const getCurrentRows = () => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.rows.slice(startIndex, startIndex + rowsPerPage);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!data) return;

    const headers = data.headers.join(",");
    const rows = data.rows.map((row) => row.join(",")).join("\n");
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dados_consumo.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={exportToCSV}
            disabled={!data || loading}
          >
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !data ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">Nenhum dado disponível</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    {data.headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 text-left text-sm font-medium text-muted-foreground border-b"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getCurrentRows().map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b hover:bg-muted/20 transition-colors"
                    >
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 text-sm">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {(currentPage - 1) * rowsPerPage + 1} a{" "}
                  {Math.min(currentPage * rowsPerPage, data.rows.length)} de{" "}
                  {data.rows.length} registros
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
