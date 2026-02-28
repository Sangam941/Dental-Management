import type { BillingPayload } from '../types';
import api from './axios';

export const getAllBills = async () => {
    const data = await api.get('/billings');
    // console.log(data.data.data)
    return data.data.data;
};

export const createBill = async (payload:BillingPayload) => {
    const data = await api.post('/billings', payload);
    // console.log(data.data.data)
    return data.data.data;
};

export const updateBill = async (entryId: string, payload:BillingPayload) => {
    const data = await api.patch(`/billings/${entryId}`, payload);
    // console.log(data.data.data)
    return data.data.data;
};

export const deleteBill = async (entryId: string) => {
    await api.delete(`/billings/${entryId}`);
};
