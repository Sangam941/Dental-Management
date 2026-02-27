import api from './axios';

interface CasePayload {
    entryDateBs: string;
    entryMonth?: string;
    caseType: string;
    patientName: string;
    age: number;
    address: string;
    phoneNo: string;
    treatment: string;
    doctorId: string | null;
    totalAmount?: number;
    paymentMethod?: string;
    paidAmount?: number;
    expenseAmount?: number;
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
