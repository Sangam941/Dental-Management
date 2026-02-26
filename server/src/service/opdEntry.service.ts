import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { CreateOpdEntryInput, UpdateOpdEntryInput } from '../validators/opdEntry.validator.js';
import { Prisma } from '@prisma/client';

// Auto-compute dueAmount = totalAmount - paidAmount (floor at 0)
const computeDueAmount = (total: number, paid: number): number => {
    return Math.max(0, total - paid);
};

export const createOpdEntryService = async (
    data: CreateOpdEntryInput
) => {
    // Verify doctor exists if provided
    if (data.doctorId) {
        const doctor = await prisma.doctor.findUnique({ where: { id: data.doctorId } });
        if (!doctor) throw new AppError('Doctor not found', 404);
    }

    const totalAmount = data.totalAmount ?? 0;
    const paidAmount = data.paidAmount ?? 0;
    const dueAmount = computeDueAmount(totalAmount, paidAmount);
    const expenseAmount = data.expenseAmount ?? 0;

    const entry = await prisma.opdEntry.create({
        data: {
            entryDateBs: data.entryDateBs,
            entryMonth: data.entryMonth ?? null,
            notes: data.notes ?? null,
            caseType: data.caseType,
            regNo: data.regNo ?? null,
            patientName: data.patientName,
            age: data.age ?? null,
            address: data.address ?? null,
            phoneNo: data.phoneNo ?? null,
            treatment: data.treatment ?? null,
            doctorId: data.doctorId ?? null,
            totalAmount: new Prisma.Decimal(totalAmount),
            paymentMethod: (data.paymentMethod as any) ?? 'CASH',
            paidAmount: new Prisma.Decimal(paidAmount),
            dueAmount: new Prisma.Decimal(dueAmount),
            expenseAmount: new Prisma.Decimal(expenseAmount),
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
    entryDateBs?: string;
} = {}) => {
    const entries = await prisma.opdEntry.findMany({
        where: {
            ...(filters.doctorId && { doctorId: filters.doctorId }),
            ...(filters.entryMonth && { entryMonth: filters.entryMonth }),
            ...(filters.entryDateBs && { entryDateBs: filters.entryDateBs }),
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

    // Recompute dueAmount with new or existing values
    const totalAmount =
        data.totalAmount !== undefined
            ? data.totalAmount
            : Number(entry.totalAmount);
    const paidAmount =
        data.paidAmount !== undefined
            ? data.paidAmount
            : Number(entry.paidAmount);
    const dueAmount = computeDueAmount(totalAmount, paidAmount);

    const updated = await prisma.opdEntry.update({
        where: { id: entryId },
        data: {
            ...(data.entryDateBs && { entryDateBs: data.entryDateBs }),
            ...(data.entryMonth !== undefined && { entryMonth: data.entryMonth }),
            ...(data.notes !== undefined && { notes: data.notes }),
            ...(data.caseType && { caseType: data.caseType }),
            ...(data.regNo !== undefined && { regNo: data.regNo }),
            ...(data.patientName && { patientName: data.patientName }),
            ...(data.age !== undefined && { age: data.age }),
            ...(data.address !== undefined && { address: data.address }),
            ...(data.phoneNo !== undefined && { phoneNo: data.phoneNo }),
            ...(data.treatment !== undefined && { treatment: data.treatment }),
            ...(data.doctorId !== undefined && { doctorId: data.doctorId }),
            ...(data.paymentMethod && { paymentMethod: data.paymentMethod as any }),
            totalAmount: new Prisma.Decimal(totalAmount),
            paidAmount: new Prisma.Decimal(paidAmount),
            dueAmount: new Prisma.Decimal(dueAmount),
            expenseAmount: data.expenseAmount !== undefined
                ? new Prisma.Decimal(data.expenseAmount ?? 0)
                : undefined,
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
