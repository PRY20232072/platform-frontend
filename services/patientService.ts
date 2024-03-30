import http from "./httpCommon";

const patientPath = "/Patient";

class PatientService {
  getPatientList = () => {
    return http.get(`${patientPath}`);
  };

  getPatientById = (id: string) => {
    return http.get(`${patientPath}/${id}`);
  };

  createPatient = (id: string, data: any) => {
    return http.post(`${patientPath}`, {
      identifier: id,
      payload: data,
    });
  };

  updatePatient = (id: string, data: any) => {
    return http.put(`${patientPath}/${id}`, {
      payload: data,
    });
  };

  deletePatient = (id: string) => {
    return http.delete(`${patientPath}/${id}`);
  };
}

export default new PatientService();
