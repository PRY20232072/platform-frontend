import http from "./httpCommon";

const practitionerPath = "/Practitioner";

class PractitionerService {
  getPractitionerList = () => {
    return http.get(`${practitionerPath}`);
  };

  getPractitionerById = (id: string) => {
    return http.get(`${practitionerPath}/${id}`);
  };

  createPractitioner = (id: string, data: any) => {
    return http.post(`${practitionerPath}`, {
      identifier: id,
      payload: data,
    });
  };

  updatePractitioner = (id: string, data: any) => {
    return http.put(`${practitionerPath}/${id}`, {
      payload: data,
    });
  };

  deletePractitioner = (id: string) => {
    return http.delete(`${practitionerPath}/${id}`);
  };
}

export default new PractitionerService();
