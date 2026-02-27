import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { CreateOpdEntryInput, UpdateOpdEntryInput } from '../validators/opdEntry.validator.js';

export const createOpdEntryService = async (
    data: CreateOpdEntryInput
) => {
    // Verify doctor exists if provided
    if (data.doctorId) {
        const doctor = await prisma.doctor.findUnique({ where: { id: data.doctorId } });
        if (!doctor) throw new AppError('Doctor not found', 404);
    }

    const entry = await prisma.opdEntry.create({
        data: {
            entryDate: data.entryDate,
            entryMonth: data.entryMonth ?? null,
            notes: data.notes ?? null,
            caseType: data.caseType,
            regNo: data.regNo ?? null,
            fullName: data.fullName,
            age: data.age ?? null,
            address: data.address ?? null,
            phoneNumber: data.phoneNumber ?? null,
            treatment: data.treatment ?? null,
            gender: (data.gender as any) ?? 'MALE',
            doctorId: data.doctorId ?? null,
        },
        include: {
            doctor: { select: { id: true, fullName: true } },
        },
    });

    return entry;
};

export const getOpdEntriesService = async (filters: {
    doctorId?: string;
    entryMonth?: string;
    entryDate?: string;
} = {}) => {
    const entries = await prisma.opdEntry.findMany({
        where: {
            ...(filters.doctorId && { doctorId: filters.doctorId }),
            ...(filters.entryMonth && { entryMonth: filters.entryMonth }),
            ...(filters.entryDate && { entryDate: filters.entryDate }),
        },
        orderBy: { createdAt: 'desc' },
        include: {
            doctor: { select: { id: true, fullName: true } },
        },
    });

    return entries;
};

export const getOpdEntryByIdService = async (entryId: string) => {
    const entry = await prisma.opdEntry.findUnique({
        where: { id: entryId },
        include: {
            doctor: { select: { id: true, fullName: true } },
        },
    });

    if (!entry) throw new AppError('OPD entry not found', 404);

    return entry;
};

export const updateOpdEntryService = async (
    entryId: string,
    data: UpdateOpdEntryInput
) => {
    const entry = await prisma.opdEntry.findUnique({ where: { id: entryId } });
    if (!entry) throw new AppError('OPD entry not found', 404);

    // Verify doctor exists if changing doctor
    if (data.doctorId !== undefined && data.doctorId !== null) {
        const doctor = await prisma.doctor.findUnique({ where: { id: data.doctorId } });
        if (!doctor) throw new AppError('Doctor not found', 404);
    }

    const updated = await prisma.opdEntry.update({
        where: { id: entryId },
        data: {
            ...(data.entryDate && { entryDate: data.entryDate }),
            ...(data.entryMonth !== undefined && { entryMonth: data.entryMonth }),
            ...(data.notes !== undefined && { notes: data.notes }),
            ...(data.caseType && { caseType: data.caseType }),
            ...(data.regNo !== undefined && { regNo: data.regNo }),
            ...(data.fullName && { fullName: data.fullName }),
            ...(data.age !== undefined && { age: data.age }),
            ...(data.address !== undefined && { address: data.address }),
            ...(data.phoneNumber !== undefined && { phoneNumber: data.phoneNumber }),
            ...(data.treatment !== undefined && { treatment: data.treatment }),
            ...(data.gender !== undefined && { gender: data.gender as any }),
            ...(data.doctorId !== undefined && { doctorId: data.doctorId }),
        },
        include: {
            doctor: { select: { id: true, fullName: true } },
        },
    });

    return updated;
};

export const deleteOpdEntryService = async (entryId: string) => {
    const entry = await prisma.opdEntry.findUnique({ where: { id: entryId } });
    if (!entry) throw new AppError('OPD entry not found', 404);

    await prisma.opdEntry.delete({ where: { id: entryId } });

    return { message: 'OPD entry deleted successfully' };
};
