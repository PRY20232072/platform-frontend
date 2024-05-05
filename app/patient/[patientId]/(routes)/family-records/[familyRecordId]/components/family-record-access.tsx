import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import consentService from "@/services/consentService";
import FamilyRecordAccessTable from "./family-record-access-table";
import practitionerService from "@/services/practitionerService";
import PractitionersSearch from "@/components/patient/practitioners-search-modal";

type Practitioner = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
};

type FamilyRecordAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
};

function FamilyRecordAccess() {
  const [items, setItems] = useState<FamilyRecordAccess[]>([]);
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const {
    response: getActiveConsentListResponse,
    fetchData: getActiveConsentList,
  } = useApi();
  const { response: revokeConsentResponse, fetchData: revokeConsent } =
    useApi();
  const { response: createConsentResponse, fetchData: createConsent } = useApi();
  const { response: getPractitionersResponse, fetchData: getPractitioners } = useApi();
  const params = useParams();

  // Fetch active consents by patient id
  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await getActiveConsentList(
          consentService.getActiveConsentListByPatientId(
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.patientId]);

  // Filter active consents by family record id
  useEffect(() => {
    if (
      !getActiveConsentListResponse.isLoading &&
      getActiveConsentListResponse.isSuccess &&
      params.familyRecordId
    ) {
      let activeConsentList =
        getActiveConsentListResponse.data as FamilyRecordAccess[];
      activeConsentList = activeConsentList.filter(
        (consent) => consent.register_id === params.familyRecordId
      );
      setItems(activeConsentList);
    }
  }, [getActiveConsentListResponse, params.familyRecordId]);

  //  Fetch practitioners if consent is revoked or created
  useEffect(() => {
    if (
      ((!revokeConsentResponse.isLoading &&
      revokeConsentResponse.isSuccess) ||
      (!createConsentResponse.isLoading &&
      createConsentResponse.isSuccess)) &&
      params.patientId
    ) {
      getActiveConsentList(
        consentService.getActiveConsentListByPatientId(
          params.patientId as string
        )
      );
    }
  }, [revokeConsentResponse, createConsentResponse, params.patientId]);

  const handleRevoke = async (consent: FamilyRecordAccess) => {
    await revokeConsent(
      consentService.revokeConsent(consent.register_id, consent.practitioner_id)
    );
  };

  // Fetch practitioners
  useEffect(() => {
    if (params.familyRecordId) {
      getPractitioners(practitionerService.getPractitionerList());
    }
  }, [params.familyRecordId]);

  // Parse practitioners response if successful
  useEffect(() => {
    if (getPractitionersResponse.isSuccess) {
      parsePractitioners(getPractitionersResponse.data);
    }
  }, [getPractitionersResponse.isSuccess]);

  const parsePractitioners = (practitioners: any) => {
    const parsedPractitioners = practitioners.map(
      (practitioner: any) =>
        ({
          id: practitioner.practitioner_id,
          name: practitioner.name_id,
          email: practitioner.email,
          phone_number: practitioner.telephone,
        } as Practitioner)
    );

    setPractitioners(parsedPractitioners);
  };

  return (
    <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
      <CardBody>
        <PractitionersSearch
          practitioners={practitioners}
          createConsent={createConsent}
          registerId={params.familyRecordId as string}
          registerType="FAMILY_HISTORY"
        />
        <FamilyRecordAccessTable
          items={items}
          handleRevoke={handleRevoke}
          getActiveConsentListResponse={getActiveConsentListResponse}
        />
      </CardBody>
    </Card>
  );
}

export default FamilyRecordAccess;
