import CustomSuspense from "@/components/custom-suspense";
import AddDocModal from "@/components/documents/add-doc-modal";
import DocumentsTable from "@/components/documents/documents-table";
import Loading from "@/components/loading";
import { useApi } from "@/hooks/useApi";
import patientService from "@/services/patientService";
import { RegisterFile } from "@/types/registerFile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PatientDocuments = () => {
  const [files, setFiles] = useState<RegisterFile[]>([]);
  const { response: getPatientByIdResponse, fetchData: getPatientById } =
    useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await getPatientById(
          patientService.getPatientById(params.patientId as string)
        );
      }
    };

    fetchData();
  }, [params.patientId]);

  useEffect(() => {
    if (getPatientByIdResponse.isSuccess) {
      setFiles(getPatientByIdResponse.data.files || []);
    }
  }, [getPatientByIdResponse]);

  return (
    <div className="w-full max-w-[920px] mx-auto">
      <CustomSuspense
        isLoading={getPatientByIdResponse.isLoading}
        fallback={<Loading />}
      >
        <div className="flex flex-col">
          <AddDocModal />
          <DocumentsTable items={files} />
        </div>
      </CustomSuspense>
    </div>
  );
};

export default PatientDocuments;
