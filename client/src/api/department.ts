import api from './axios';

export const getDepartments = async () => {
    const data = await api.get('/departments');
    console.log(data.data.departments);
    return data.data.departments;
};

export const getDepartment = async (id: string) => {
    const data = await api.get(`/departments/${id}`);
    console.log(data)
    return data;
};

export const createDepartment = async (name: string) => {
    const data = await api.post('/departments', { name });
    console.log(data)
    return data;
};


export const updateDepartment = async (id: string, name: string, status: string) => {
    const data = await api.patch(`/departments/${id}`, {name, status});
    console.log(data)
    return data;
};

export const deleteDepartmentApi = async (id: string) => {
    await api.delete(`/departments/${id}`);
};
