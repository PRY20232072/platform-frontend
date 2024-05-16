import http from "./httpCommon";
const familyRecordPath = "/FamilyHistory";

class FamilyRecordService {
  getFamilyRecordList = () => {
    return http.get(`${familyRecordPath}`);
  };

  getFamilyRecordById = (id: string) => {
    return http.get(`${familyRecordPath}/${id}`);
  };

  getFamilyRecordByPatientId = (id: string) => {
    return http.get(`${familyRecordPath}/patient/${id}`);
  };

  getFamilyRecordByIdPatientId = (
    id: string,
    patientId: string
  ) => {
    return http.get(`${familyRecordPath}/${id}/patient/${patientId}`);
  };

  createFamilyRecord = (data: any) => {
    return http.post(`${familyRecordPath}`, data);
  };

  updateFamilyRecord = (
    id: string,
    data: any,
    practitioner_id: string | null
  ) => {
    let params = {};

    if (practitioner_id) {
      params = {
        practitioner_id: practitioner_id,
      };
    }

    return http.put(`${familyRecordPath}/${id}`, { payload: data }, params);
  };

  deleteFamilyRecord = (
    id: string,
    patientId: string | null,
    practitioner_id: string | null
  ) => {
    let params = {};

    if (patientId) {
      params = {
        patient_id: patientId,
      };
    }

    if (practitioner_id) {
      params = {
        practitioner_id: practitioner_id,
      };
    }

    return http.delete(`${familyRecordPath}/${id}`, { params });
  };
}
export default new FamilyRecordService();
