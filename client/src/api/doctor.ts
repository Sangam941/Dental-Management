import api from './axios';

export const getDoctors = async () => {
    const data = await api.get('/doctors');
    console.log(data.data.doctors);
    return data.data.doctors;
};

export const createDoctor = async (fullName: string, phoneNumber: string, departmentId: string,) => {
    const data = await api.post('/doctors', { fullName, phoneNumber, departmentId });
    console.log(data.data.doctor)
    return data.data.doctor;
};


export const updateDoctor = async (id: string, fullName: string, isActive: boolean) => {
    const data = await api.patch(`/doctors/${id}`, {fullName, isActive});
    console.log("updated data::", data.data.doctor)
    return data.data.doctor;
};

export const deleteDoctorApi = async (id: string) => {
    await api.delete(`/doctors/${id}`);
};
