import api from './axios';

interface CasePayload {
    entryDate: string;
    entryMonth?: string;
    caseType: string;
    fullName: string;
    age: number;
    gender: string;
    address: string;
    phoneNumber: string;
    treatment: string;
    doctorId: string | null;
}

export const getAllEntry = async () => {
    const data = await api.get('/opd-entries');
    return data.data.entries;
};

export const createOPDEntry = async (payload:CasePayload) => {
    const data = await api.post('/opd-entries', payload);
    return data.data.entry;
};

export const updateOPDEntry = async (entryId: string, payload:CasePayload) => {
    const data = await api.patch(`/opd-entries/${entryId}`, payload);
    return data.data.entry;
};

export const deletePatient = async (entryId: string) => {
    await api.delete(`/opd-entries/${entryId}`);
};
