import PractitionersSearch from "@/components/patient/practitioners-search-modal";
import { Card, CardBody } from "@nextui-org/card";
import AllergyAccessTable from "./allergy-access-table";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import consentService from "@/services/consentService";
import practitionerService from "@/services/practitionerService";

type Practitioner = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
};

type AllergiesAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
};

function AllergyAccess() {
  const [items, setItems] = useState<AllergiesAccess[]>([]);
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

  // Filter active consents by allergy record id
  useEffect(() => {
    if (
      !getActiveConsentListResponse.isLoading &&
      getActiveConsentListResponse.isSuccess &&
      params.allergyIntoleranceId
    ) {
      let activeConsentList =
        getActiveConsentListResponse.data as AllergiesAccess[];
      activeConsentList = activeConsentList.filter(
        (consent) => consent.register_id === params.allergyIntoleranceId
      );
      setItems(activeConsentList);
    }
  }, [getActiveConsentListResponse, params.allergyIntoleranceId]);

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

  const handleRevoke = async (consent: AllergiesAccess) => {
    await revokeConsent(
      consentService.revokeConsent(consent.register_id, consent.practitioner_id)
    );
  };

  // Fetch practitioners
  useEffect(() => {
    if (params.allergyIntoleranceId) {
      getPractitioners(practitionerService.getPractitionerList());
    }
  }, [params.allergyIntoleranceId]);

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
          registerId={params.allergyIntoleranceId as string}
          registerType="ALLERGY"
        />
        <AllergyAccessTable
          items={items}
          handleRevoke={handleRevoke}
          getActiveConsentListResponse={getActiveConsentListResponse}
        />
      </CardBody>
    </Card>
  );
}

export default AllergyAccess;
