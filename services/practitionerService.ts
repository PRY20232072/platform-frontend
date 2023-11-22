import http from "./httpCommon";

const patientPath = '/Practitioner';

class PractitionerService {
    getPractitionerList = () => {
        return http.get(`${patientPath}`);
    };

    getPractitionerById = (id: string) => {
        return http.get(`${patientPath}/${id}`);
    };

    createPractitioner = (data: any) => {
        return http.post(`${patientPath}`, data);
    };

    updatePractitioner = (id: string, data: any) => {
        return http.put(`${patientPath}/${id}`, data);
    };

    deletePractitioner = (id: string) => {
        return http.delete(`${patientPath}/${id}`);
    };
};

export default new PractitionerService;