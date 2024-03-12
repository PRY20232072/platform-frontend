"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import {
  familyRecordStatus,
  selectedPatientFamilyRecordDocs,
  selectedPatientFamilyRecordDocsTableColumns,
  genders,
} from "@/data/data";
import { FamilyRecordDocs } from "./family-record-docs";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import { FamilyRecordDocFormModal } from "@/components/modal/family-record-doc-form";

export const FamilyRecordClient = () => {
  const [family_record, setFamilyRecord] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { response: familyRecordResponse, fetchData: getAllergy } = useApi();
  const {
    response: updateFamilyRecordResponse,
    fetchData: updateFamilyRecord,
  } = useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.familyRecordId) {
        await getAllergy(
          familyRecordService.getFamilyRecordById(
            params.familyRecordId as string
          )
        );
      }
    };

    fetchData();
  }, [params.familyRecordId]);

  useEffect(() => {
    if (familyRecordResponse.isSuccess) {
      setFamilyRecord(familyRecordResponse.data[0]);
    }
  }, [familyRecordResponse.isSuccess]);

  useEffect(() => {
    if (updateFamilyRecordResponse.isSuccess) {
      getAllergy(
        familyRecordService.getFamilyRecordById(params.familyRecordid as string)
      );
    }
  }, [updateFamilyRecordResponse.isSuccess]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateFamilyRecord(
      familyRecordService.updateFamilyRecord(
        family_record.familyHistory_id,
        family_record,
        params.practitionerId as string
      )
    );

    setIsEditing(!isEditing);
  };

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <Card>
            <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
              <form onSubmit={handleEdit}>
                <div className="mb-4 font-bold text-2xl leading-[24px]">
                  Family Record Information
                </div>
                <div className="mb-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
                  <Input
                    isReadOnly={!isEditing}
                    className="mb-4"
                    type="text"
                    label="Name"
                    labelPlacement="outside"
                    value={family_record.name}
                    onChange={(e) => {
                      setFamilyRecord({
                        ...family_record,
                        name: e.target.value,
                      });
                    }}
                  />

                  <Input
                    isReadOnly={!isEditing}
                    className="mb-4"
                    type="text"
                    label="Reason"
                    labelPlacement="outside"
                    value={family_record.reason}
                    onChange={(e) => {
                      setFamilyRecord({
                        ...family_record,
                        reason: e.target.value,
                      });
                    }}
                  />

                  <CustomAutocomplete
                    isDisabled={!isEditing}
                    label="Status"
                    labelPlacement="outside"
                    data={familyRecordStatus}
                    inputValue={family_record.clinical_status}
                    onInputChange={(value) => {
                      setFamilyRecord({
                        ...family_record,
                        clinical_status: value,
                      });
                    }}
                  />
                  <Textarea
                    isReadOnly={!isEditing}
                    disableAnimation
                    disableAutosize
                    classNames={{ input: "resize-y min-h-[40px]" }}
                    label="Note"
                    labelPlacement="outside"
                    value={family_record.notes}
                    onChange={(e) => {
                      setFamilyRecord({
                        ...family_record,
                        note: e.target.value,
                      });
                    }}
                  />

                  <Input
                    isReadOnly={!isEditing}
                    type="date"
                    label="Recorded date"
                    labelPlacement="outside"
                    placeholder="MM-DD-YYYY"
                    value={family_record.recorded_date}
                    onChange={(e) => {
                      setFamilyRecord({
                        ...family_record,
                        recorded_date: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="text-2xl font-bold leading-6 max-md:max-w-full">
                  Relative Information
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
                  <Input
                    isReadOnly={!isEditing}
                    className="mb-4"
                    type="text"
                    label="Relative Name"
                    labelPlacement="outside"
                    value={family_record.relative_name}
                    onChange={(e) => {
                      setFamilyRecord({
                        ...family_record,
                        relative_name: e.target.value,
                      });
                    }}
                  />

                  <CustomAutocomplete
                    isDisabled={!isEditing}
                    label="Gender"
                    labelPlacement="outside"
                    data={genders}
                    inputValue={family_record.gender}
                    onInputChange={(value) => {
                      setFamilyRecord({ ...family_record, gender: value });
                    }}
                  />
                  <Input
                    isReadOnly={!isEditing}
                    type="date"
                    label="Birthdate"
                    labelPlacement="outside"
                    placeholder="MM-DD-YYYY"
                    value={family_record.birthdate}
                    onChange={(e) => {
                      setFamilyRecord({
                        ...family_record,
                        birthdate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  {isEditing ? (
                    <>
                      <Button
                        className="text-red-600 font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-300 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                        onClick={() => {
                          setIsEditing(!isEditing);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl"
                        type="submit"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="documents" title="Documents">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <FamilyRecordDocFormModal />

              <FamilyRecordDocs
                items={selectedPatientFamilyRecordDocs}
                columns={selectedPatientFamilyRecordDocsTableColumns}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};
