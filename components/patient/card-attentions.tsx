"use client";

import { useApi } from "@/hooks/useApi";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomSuspense from "../custom-suspense";
import CardSkeleton from "../ui/skeletons/card-skeleton";
import { Card } from "../ui/card";
import { Pill } from "lucide-react";
import attentionService from "@/services/attentionService";
import { typeOfAttentionMap } from "@/data/data";

export default function CardAttentions() {
  const { response: getAttentionsListResponse, fetchData: getAttentionsList } =
    useApi();
  const [attentionList, setAttentionList] = useState<any>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getAttentionsList(
          attentionService.getAttentionListByPatientId(
            session?.user?.id as string
          )
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const updateAttentionList = () => {
      const data = getAttentionsListResponse?.data;
      if (data && data.length > 0) {
        const updatedList = getAttentionsListResponse.data.map(
          (attention: any) => ({
            col1: typeOfAttentionMap[attention.typeOfAttention],
            col2: attention.recorded_date,
          })
        );
        setAttentionList(updatedList);
      } else {
        setAttentionList([]);
      }
    };

    updateAttentionList();
  }, [getAttentionsListResponse?.data]);

  return (
    <CustomSuspense
      isLoading={getAttentionsListResponse.isLoading}
      fallback={<CardSkeleton />}
    >
      <Card
        link={`patient/${session?.user?.id}/attention-history`}
        card_title="Historial de atenciones"
        icon={
          <Pill
            className="w-5 h-[18px] left-[2px] top-[3px] absolute"
            color="white"
          />
        }
        heading_one="Detalle"
        heading_two="Fecha de registro"
        cardData={attentionList}
        className="w-full"
      />
    </CustomSuspense>
  );
}
