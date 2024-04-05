import http from "./httpCommon";
const filesPath = "/Files";

class FilesService {
  uploadFile = (data: any) => {
    return http.post(`${filesPath}/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getFile = (fileId: string) => {
    return http.get(`${filesPath}/${fileId}`, {
      responseType: "arraybuffer",
    });
  };
}

export default new FilesService();