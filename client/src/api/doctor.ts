import api from './axios';

export const getDoctors = async () => {
    const data = await api.get('/doctors');
    console.log(data.data.doctors);
    return data.data.doctors;
};

export const createDoctor = async (name: string) => {
    const data = await api.post('/doctors', { name });
    console.log(data)
    return data;
};


export const updateDoctor = async (id: string, name: string, status: string) => {
    const data = await api.patch(`/doctors/${id}`, {name, status});
    console.log(data)
    return data;
};

export const deleteDoctorApi = async (id: string) => {
    await api.delete(`/doctors/${id}`);
};
