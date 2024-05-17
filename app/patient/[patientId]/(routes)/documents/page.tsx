"use client";

import CustomSuspense from "@/components/custom-suspense";
import DocumentsTable from "@/components/documents/documents-table";
import Loading from "@/components/loading";
import { useApi } from "@/hooks/useApi";
import patientService from "@/services/patientService";
import { RegisterFile } from "@/types/registerFile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DocumentsPage = () => {
  const [files, setFiles] = useState<RegisterFile[]>([]);
  const { response: getPatientByIdResponse, fetchData: getPatientById } =
    useApi();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getPatientById(
          patientService.getPatientById(session?.user?.id as string)
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (getPatientByIdResponse.isSuccess) {
      setFiles(getPatientByIdResponse.data.files || []);
    }
  }, [getPatientByIdResponse]);

  return (
    <div className="w-full max-w-[920px] mx-auto mt-6">
      <h1 className="text-4xl font-bold leading-10 mb-2">Documentos</h1>
      <CustomSuspense
        isLoading={getPatientByIdResponse.isLoading}
        fallback={<Loading />}
      >
        <DocumentsTable items={files} />
      </CustomSuspense>
    </div>
  );
};

export default DocumentsPage;
