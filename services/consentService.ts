import http from "./httpCommon";

const consentPath = "/Consent";

class ConsetService {
  getByPractitionerId = (id: string) => {
    return http.get(`${consentPath}/practitioner/${id}`);
  };

  // TODO: remove this method
  getByRegisteryIdAndPractitionerId = (
    registerId: string,
    practitionerId: string
  ) => {
    return http.get(
      `${consentPath}/register/${registerId}/practitioner/${practitionerId}`
    );
  };

  getActiveConsentListByPatientId = (id: string) => {
    return http.get(`${consentPath}/patient/${id}/active`);
  };

  getPendingConsentListByPatientId = (id: string) => {
    return http.get(`${consentPath}/patient/${id}/pending`);
  };

  createConsent = (data: any) => {
    return http.post(`${consentPath}`, {
      payload: data,
    });
  };

  approveConsent = (patientId: string, practitionerId: string) => {
    return http.put(
      `${consentPath}/patient/${patientId}/practitioner/${practitionerId}`
    );
  };

  revokeConsent = (patientId: string, practitionerId: string) => {
    return http.delete(
      `${consentPath}/patient/${patientId}/practitioner/${practitionerId}`
    );
  };
}

export default new ConsetService();
