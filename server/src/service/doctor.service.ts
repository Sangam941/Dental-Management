import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { CreateDoctorInput, UpdateDoctorInput } from '../validators/doctor.validator.js';

export const createDoctorService = async (data: CreateDoctorInput) => {
    // Verify department exists if provided
    if (data.departmentId) {
        const dept = await prisma.department.findUnique({
            where: { id: data.departmentId },
        });
        if (!dept) {
            throw new AppError('Department not found', 404);
        }
        if (!dept.isActive) {
            throw new AppError('Cannot assign doctor to an inactive department', 400);
        }
    }

    const doctor = await prisma.doctor.create({
        data: {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber ?? null,
            departmentId: data.departmentId ?? null,
            gender: data.gender ?? 'MALE',
        },
        include: { department: true },
    });

    return doctor;
};

export const getDoctorsService = async (departmentId?: string, activeOnly: boolean = false) => {
    const doctors = await prisma.doctor.findMany({
        where: {
            ...(activeOnly ? { isActive: true } : {}),
            ...(departmentId ? { departmentId } : {}),
        },
        orderBy: { createdAt: 'desc' },
        include: {
            department: { select: { id: true, departmentName: true } },
        },
    });

    return doctors;
};

export const getDoctorByIdService = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id },
        include: {
            department: true,
        },
    });

    if (!doctor) {
        throw new AppError('Doctor not found', 404);
    }

    return doctor;
};

export const updateDoctorService = async (id: string, data: UpdateDoctorInput) => {
    const doctor = await prisma.doctor.findUnique({ where: { id } });

    if (!doctor) {
        throw new AppError('Doctor not found', 404);
    }

    // Verify new department exists if being changed
    if (data.departmentId !== undefined && data.departmentId !== null) {
        const dept = await prisma.department.findUnique({
            where: { id: data.departmentId },
        });
        if (!dept) {
            throw new AppError('Department not found', 404);
        }
        if (!dept.isActive) {
            throw new AppError('Cannot assign doctor to an inactive department', 400);
        }
    }

    const updated = await prisma.doctor.update({
        where: { id },
        data,
        include: { department: true },
    });

    return updated;
};

export const deleteDoctorService = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({ where: { id } });

    if (!doctor) {
        throw new AppError('Doctor not found', 404);
    }

    // Hard delete
    const deleted = await prisma.doctor.delete({
        where: { id },
    });

    return deleted;
};
