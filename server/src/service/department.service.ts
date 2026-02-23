import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { CreateDepartmentInput, UpdateDepartmentInput } from '../validators/department.validator.js';

export const createDepartmentService = async (data: CreateDepartmentInput) => {
    // Check for duplicate name
    const existing = await prisma.department.findUnique({
        where: { name: data.name },
    });

    if (existing) {
        throw new AppError(`Department "${data.name}" already exists`, 409);
    }

    const department = await prisma.department.create({
        data: { name: data.name },
    });

    return department;
};

export const getDepartmentsService = async (activeOnly: boolean = false) => {
    const departments = await prisma.department.findMany({
        where: activeOnly ? { isActive: true } : undefined,
        orderBy: { name: 'asc' },
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
    if (data.name && data.name !== department.name) {
        const existing = await prisma.department.findUnique({
            where: { name: data.name },
        });
        if (existing) {
            throw new AppError(`Department "${data.name}" already exists`, 409);
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

    // Soft delete — mark as inactive
    const deleted = await prisma.department.update({
        where: { id },
        data: { isActive: false },
    });

    return deleted;
};
