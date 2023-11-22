import http from "./httpCommon";

const allergyPath = '/AllergyIntolerance';

class AllergyIntoleranceService {
    getAllergyList = () => {
        return http.get(`${allergyPath}`);
    };
    
    getAllergyById = (id: string) => {
        return http.get(`${allergyPath}/${id}`);
    };
    
    getAllergyByPatientId = (id: string) => {
        return http.get(`${allergyPath}/patient/${id}`);
    };
    
    getAllergyByIdPatientId = (id: string, patientId: string, practitionerId: string | null) => {
        let params = {};
    
        if (practitionerId) {
            params = {
                "practitioner_id": practitionerId
            };
        }
    
        return http.get(`${allergyPath}/${id}/patient/${patientId}`, params);
    };
    
    createAllergy = (data: any) => {
        return http.post(`${allergyPath}`, data);
    };
    
    updateAllergy = (id: string, data: any, practitioner_id: string | null) => {
        let params = {};
    
        if (practitioner_id) {
            params = {
                "practitioner_id": practitioner_id
            };
        }
    
        return http.put(`${allergyPath}/${id}`, data, params);
    };
    
    deleteAllergy = (id: string, patientId: string | null, practitioner_id: string | null) => {
        let params = {};
    
        if (patientId) {
            // add patient id to params
            params = {
                "patient_id": patientId
            };
        }
    
        if (practitioner_id) {
            // add practitioner id to params
            params = {
                "practitioner_id": practitioner_id
            };
        }
    
        return http.delete(`${allergyPath}/${id}`, params);
    };
}

export default new AllergyIntoleranceService;