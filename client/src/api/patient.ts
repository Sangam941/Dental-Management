import api from './axios';

export interface CasePayload {
    caseType: "NEW" | "FOLLOW_UP" | string; // expand as per use case
    patientName: string;
    age: number;
    address: string;
    phoneNo: string;
    treatment: string;
    doctorId: string;
}

export const getPatients = async () => {
    const data = await api.get('/patients');
    console.log(data.data.patients);
    return data.data.patients;
};

export const createPatient = async (payload:CasePayload) => {
    const data = await api.post('/patients', payload);
    console.log(data.data.patient)
    return data.data.patient;
};

export const updatePatient = async (id: string, fullName: string, isActive: boolean) => {
    const data = await api.patch(`/patients/${id}`, { fullName, isActive });
    console.log("updated data::", data.data.patient)
    return data.data.patient;
};

export const deletePatientApi = async (id: string) => {
    await api.delete(`/patients/${id}`);
};
