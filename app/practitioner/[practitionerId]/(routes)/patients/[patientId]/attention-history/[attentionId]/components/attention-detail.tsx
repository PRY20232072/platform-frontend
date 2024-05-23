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
  console.log(attention);
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
    <CustomSuspense
      isLoading={getAllergyByIdPatientIdResponse.isLoading}
      fallback={<Loading />}
    >
      <Card className='items-stretch self-stretch shadow flex flex-col my-2.5 p-5 rounded-2xl max-md:max-w-full'>
        {attention && (
          <AttentionDetailFields
            attention={attention}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
        )}
      </Card>
    </CustomSuspense>
  );
};

export default AttentionDetail;
