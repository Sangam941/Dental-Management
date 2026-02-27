import api from './axios';

export const getDepartments = async () => {
    const data = await api.get('/departments');
    // console.log(data.data.departments);
    return data.data.departments;
};

export const createDepartment = async (departmentName: string) => {
    const data = await api.post('/departments', { departmentName });
    // console.log(data)
    return data;
};


export const updateDepartment = async (id: string, departmentName: string, isActive: boolean) => {
    const data = await api.patch(`/departments/${id}`, {departmentName, isActive});
    // console.log(data)
    return data;
};

export const deleteDepartmentApi = async (id: string) => {
    await api.delete(`/departments/${id}`);
};
