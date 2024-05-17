import http from "./httpCommon";
const filesPath = "/Files";

class FilesService {
  uploadFile = (
    createdDate: string,
    fileName: string,
    type: string,
    patient_id: string,
    data: any
  ) => {
    return http.post(
      `${filesPath}/upload?created_date=${createdDate}&file_name=${fileName}&file_type=${type}&patient_id=${patient_id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  getFile = (fileId: string) => {
    return http.get(`${filesPath}/${fileId}`, {
      responseType: "arraybuffer",
    });
  };
}

export default new FilesService();
