import React from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Column {
  label: string;
  accessor: string | ((row: any) => any);
}

interface DataExportProps {
  data: any[];
  columns: Column[];
  filename?: string;
  title?: string;
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const DataExport: React.FC<DataExportProps> = ({
  data,
  columns,
  filename = "export",
  title = "Exported Data",
}) => {
  const resolveValue = (accessor: Column["accessor"], row: any) => {
    if (typeof accessor === "function") return accessor(row);
    return getNestedValue(row, accessor);
  };

  const exportToCSV = () => {
    if (!data.length) return;

    const headers = columns.map((col) => col.label);
    const rows = data.map((row) =>
      columns.map((col) => resolveValue(col.accessor, row))
    );

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    const rows = data.map((row) => {
      const result: Record<string, any> = {};
      columns.forEach((col) => {
        result[col.label] = resolveValue(col.accessor, row);
      });
      return result;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(title, 14, 15);

      const tableData = data.map((row) =>
        columns.map((col) => resolveValue(col.accessor, row))
      );

      autoTable(doc, {
        head: [columns.map((col) => col.label)],
        body: tableData,
        startY: 20,
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [66, 139, 202] },
      });

      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("PDF export failed. See console for details.");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button onClick={exportToCSV} variant="outline" size="sm">
        CSV
      </Button>
      <Button
        onClick={exportToExcel}
        variant="outline"
        size="sm"
        className="bg-green-600 text-white hover:bg-green-700"
      >
        Excel
      </Button>
      <Button
        onClick={exportToPDF}
        variant="outline"
        size="sm"
        className="bg-red-600 text-white hover:bg-red-700"
      >
        PDF
      </Button>
    </div>
  );
};

export default DataExport;
