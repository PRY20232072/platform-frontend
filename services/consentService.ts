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

  approveConsent = (registerId: string, practitionerId: string) => {
    return http.put(
      `${consentPath}/register/${registerId}/practitioner/${practitionerId}`
    );
  };

  revokeConsent = (registerId: string, practitionerId: string) => {
    return http.delete(
      `${consentPath}/register/${registerId}/practitioner/${practitionerId}`
    );
  };
}

export default new ConsetService();
