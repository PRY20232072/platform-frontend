import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { documentsTableColumns } from "@/data/data";
import { RegisterFile } from "@/types/registerFile";
import DocumentPreviewModal from "./document-preview-modal";
import filesService from "@/services/filesService";

interface DocumentsTableProps {
  items: RegisterFile[];
}

const DocumentsTable = ({ items }: DocumentsTableProps) => {
  const renderCell = React.useCallback(
    (allergy_docs: RegisterFile, columnKey: React.Key) => {
      const cellValue = allergy_docs[columnKey as keyof RegisterFile];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-start items-start gap-2">
              {allergy_docs.file_type !== "application/msword" &&
                allergy_docs.file_type !==
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                allergy_docs.file_type !== "application/msexcel" &&
                allergy_docs.file_type !==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                  <DocumentPreviewModal document={allergy_docs} />
                )}

              <Button
                className=" text-sm font-medium"
                radius="sm"
                size="sm"
                color="success"
                variant="flat"
                onClick={() =>
                  handleDownload(allergy_docs.hash, allergy_docs.file_name)
                }
              >
                Download
              </Button>
            </div>
          );
        case "created_date":
          return new Date(cellValue).toLocaleDateString();
        case "file_type":
          switch (cellValue) {
            case "application/pdf":
              return "PDF";
            case "image/jpeg":
              return "JPEG";
            case "image/png":
              return "PNG";
            case "application/msword":
              return "DOC";
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              return "DOCX";
            case "application/msexcel":
              return "XLS";
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              return "XLSX";
            default:
              return cellValue;
          }
        default:
          return cellValue;
      }
    },
    []
  );

  const handleDownload = async (fileId: string, fileName: string) => {
    const response = await filesService.getFile(fileId);
    const fileType = response.headers["file-type"];
    const buffer = response.data;
    const blob = new Blob([buffer], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Table aria-label="Allergies docs collection table">
        <TableHeader columns={documentsTableColumns}>
          {(column) => (
            <TableColumn
              className="text-bold"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se adjuntaron documentos al registro."}
          items={items}
        >
          {(item) => (
            <TableRow key={item.hash}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
export default DocumentsTable;
