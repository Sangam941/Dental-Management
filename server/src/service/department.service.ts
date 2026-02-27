import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { CreateDepartmentInput, UpdateDepartmentInput } from '../validators/department.validator.js';

export const createDepartmentService = async (data: CreateDepartmentInput) => {
    // Check for duplicate name
    const existing = await prisma.department.findUnique({
        where: { departmentName: data.departmentName },
    });

    if (existing) {
        throw new AppError(`Department "${data.departmentName}" already exists`, 409);
    }

    const department = await prisma.department.create({
        data: { departmentName: data.departmentName },
    });

    return department;
};

export const getDepartmentsService = async (activeOnly: boolean = false) => {
    const departments = await prisma.department.findMany({
        where: activeOnly ? { isActive: true } : undefined,
        orderBy: { departmentName: 'asc' },
        include: {
            _count: { select: { doctors: true } },
        },
    });

    return departments;
};

export const updateDepartmentService = async (
    id: string,
    data: UpdateDepartmentInput
) => {
    const department = await prisma.department.findUnique({ where: { id } });

    if (!department) {
        throw new AppError('Department not found', 404);
    }

    // If renaming, check duplicate name
    if (data.departmentName && data.departmentName !== department.departmentName) {
        const existing = await prisma.department.findUnique({
            where: { departmentName: data.departmentName },
        });
        if (existing) {
            throw new AppError(`Department "${data.departmentName}" already exists`, 409);
        }
    }

    const updated = await prisma.department.update({
        where: { id },
        data,
    });

    return updated;
};

export const deleteDepartmentService = async (id: string) => {
    const department = await prisma.department.findUnique({ where: { id } });

    if (!department) {
        throw new AppError('Department not found', 404);
    }

    // Hard delete
    const deleted = await prisma.department.delete({
        where: { id },
    });

    return deleted;
};
