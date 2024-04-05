"use client";

import { Card, CardBody } from "@nextui-org/card";
import { PatientAllergyDocsTable } from "./patient-allergy-docs-table";
import {
  selectedPatientAllergiesDocs,
  selectedPatientAllergiesDocsTableColumns,
} from "@/data/data";
import AddDocModal from "./add-doc-modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { set } from "react-hook-form";
import { useState } from "react";
import filesService from "@/services/filesService";
import Image from "next/image";
import getfileTypeFromBuffer from "@/lib/utils/fileType";

const PatientAllergyDocs = () => {
  const [fileId, setFileId] = useState("");
  const [fileType, setFileType] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const renderFile = () => {
    console.log(fileType);
    if (fileType.includes("image")) {
      return (
        <Image
          src={previewUrl}
          alt="File Preview"
          style={{ position: "relative" }}
          width={100}
          height={100}
        />
      );
    } else if (fileType.includes("pdf")) {
      return (
        <embed
          src={previewUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      );
    }
  };

  return (
    <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
      <CardBody>
        <AddDocModal />
        {/* <PatientAllergyDocsTable
          items={selectedPatientAllergiesDocs}
          columns={selectedPatientAllergiesDocsTableColumns}
        /> */}
        <Button
          onPress={async () => {
            const response = await filesService.getFile(fileId);
            const buffer = response.data;
            console.log("file type:", getfileTypeFromBuffer(buffer));
            const blob = new Blob([buffer]);
            // const blob = new Blob([buffer], {type: "application/pdf"});
            console.log(blob);
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
            setFileType(blob.type);
          }}
        >
          Get file
        </Button>
        <Input
          type="text"
          placeholder="File ID"
          onChange={(e) => {
            setFileId(e.target.value);
          }}
        />
        {previewUrl && (
          <div className="w-full h-[300px] mt-5">{renderFile()}</div>
        )}
      </CardBody>
    </Card>
  );
};

export default PatientAllergyDocs;
