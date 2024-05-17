"use client";

import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { Card } from "@nextui-org/card";
import { useApi } from "@/hooks/useApi";
import attentionService from "@/services/attentionService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttentionDetailFields from "@/components/attention/attention-detail-fields";
import { Button } from "@nextui-org/react";
import { Attention } from "@/types/attention";

const AttentionDetail = () => {
  const [attention, setAttention] = useState<Attention>({} as Attention);
  const {
    response: getAllergyByIdPatientIdResponse,
    fetchData: getAttentionByIdPatientId,
  } = useApi();
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.attentionId && params.patientId) {
        await getAttentionByIdPatientId(
          attentionService.getAttentionByIdPatientId(
            params.attentionId as string,
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.attentionId, params.patientId]);

  useEffect(() => {
    if (getAllergyByIdPatientIdResponse.isSuccess) {
      setAttention(getAllergyByIdPatientIdResponse.data);
    }
  }, [getAllergyByIdPatientIdResponse.isSuccess]);

  const handleInputChange = (key: string, value: any) => {
    setAttention({ ...attention, [key]: value });
  };

  return (
    <CustomSuspense isLoading={getAllergyByIdPatientIdResponse.isLoading} fallback={<Loading />}>
      <Card className="items-stretch self-stretch shadow flex flex-col my-2.5 p-5 rounded-2xl max-md:max-w-full">
        <form className="max-md:max-w-full">
          {attention && (<AttentionDetailFields
            attention={attention}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />)}
           {/* <div className="flex justify-center mt-4">
              {isEditing ? (
                <>
                  <Button
                    className="text-red-600 font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-300 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </>
              ) : (
                <Button
                  className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                >
                  Editar
                </Button>
              )}
            </div> */}
        </form>
      </Card>
    </CustomSuspense>
  );
};

export default AttentionDetail;
