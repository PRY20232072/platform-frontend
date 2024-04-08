import http from "./httpCommon";
const filesPath = "/Files";

class FilesService {
  uploadFile = (
    createdDate: string,
    fileName: string,
    type: string,
    registerId: string,
    registerType: string,
    data: any
  ) => {
    return http.post(
      `${filesPath}/upload?created_date=${createdDate}&file_name=${fileName}&file_type=${type}&register_id=${registerId}&register_type=${registerType}`,
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
