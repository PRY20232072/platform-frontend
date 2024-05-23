"use client";

import { useApi } from "@/hooks/useApi";
import AccessList from "./access-list";
import PractitionerSearchModal from "./practitioner-search-modal";
import { useEffect, useState } from "react";
import practitionerService from "@/services/practitionerService";
import { useParams } from "next/navigation";
import consentService from "@/services/consentService";

type Practitioner = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
};

type Consent = {
  id: string;
  patient_id: string;
  practitioner_name: string;
  practitioner_id: string;
  status: string;
};

const Access = () => {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const {
    response: getActiveConsentListResponse,
    fetchData: getActiveConsentList,
  } = useApi();
  const { response: revokeConsentResponse, fetchData: revokeConsent } =
    useApi();
  const { response: createConsentResponse, fetchData: createConsent } =
    useApi();
  const { response: getPractitionersResponse, fetchData: getPractitioners } =
    useApi();
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

  // Set consents if response is successful
  useEffect(() => {
    if (
      !getActiveConsentListResponse.isLoading &&
      getActiveConsentListResponse.isSuccess &&
      params.patientId
    ) {
      setConsents(getActiveConsentListResponse.data);
    }
  }, [getActiveConsentListResponse, params.patientId]);

  //  Fetch practitioners if consent is revoked or created
  useEffect(() => {
    if (
      ((!revokeConsentResponse.isLoading && revokeConsentResponse.isSuccess) ||
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

  // Fetch practitioners list
  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await getPractitioners(practitionerService.getPractitionerList());
      }
    };

    fetchData();
  }, [params.patientId]);

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

  const handleRevoke = async (consent: Consent) => {
    await revokeConsent(
      consentService.revokeConsent(consent.patient_id, consent.practitioner_id)
    );
    location.reload();
  };

  return (
    <div className="flex flex-col">
      <PractitionerSearchModal
        practitioners={practitioners}
        createConsent={createConsent}
      />
      <AccessList
        items={consents}
        handleRevoke={handleRevoke}
        getActiveConsentListResponse={getActiveConsentListResponse}
      />
    </div>
  );
};

export default Access;
