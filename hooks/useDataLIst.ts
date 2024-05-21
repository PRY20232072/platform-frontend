import React, { useState, useEffect } from "react";
import cieCodes from "@/data/cie10Codes_ES.json";
interface DiagnosisCode {
    code: string;
    description: string;
}
const diagnosisCodes: DiagnosisCode[] = cieCodes as DiagnosisCode[];
export function useDataList({ fetchDelay = 0 } = {}) {
  const [items, setItems] = useState<DiagnosisCode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const loadData = async (currentOffset: number) => {
    try {
      setIsLoading(true);

      if (offset > 0) {
        await new Promise((resolve) => setTimeout(resolve, fetchDelay));
      }

      const filteredData = diagnosisCodes.slice(
        currentOffset,
        currentOffset + limit
      );

      setHasMore(filteredData.length === limit);
      setItems((prevItems) => [...prevItems, ...filteredData]);
    } catch (error) {
      console.error("There was an error loading the data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(offset);
  }, []);

  const onLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    loadData(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
