import http from "./httpCommon";

const attentionPath = "/Attention";

class AttentionIntoleranceService {
  getAttentionListByPatientId = (id: string) => {
    return http.get(`${attentionPath}/patient/${id}`);
  };

  getAttentionByIdPatientId = (
    id: string,
    patientId: string,
  ) => {
    return http.get(`${attentionPath}/${id}/patient/${patientId}`);
  };

  createAttention = (data: any) => {
    return http.post(`${attentionPath}/prueba`, data);
  };

  updateAttention = (id: string, data: any) => {
    return http.put(`${attentionPath}/${id}`, { payload: data });
  };

  deleteAttention = (
    id: string
  ) => {
    return http.delete(`${attentionPath}/${id}`);
  };
}

export default new AttentionIntoleranceService();
