import http from "./httpCommon";

const consentPath = "/Consent";

class ConsetService {
  getByRegisterId = (id: string) => {
    return http.get(`${consentPath}/register/${id}`);
  };

  getByPractitionerId = (id: string) => {
    return http.get(`${consentPath}/practitioner/${id}`);
  };

  getByRegisteryIdAndPractitionerId = (
    registerId: string,
    practitionerId: string
  ) => {
    return http.get(
      `${consentPath}/register/${registerId}/practitioner/${practitionerId}`
    );
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
