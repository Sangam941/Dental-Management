import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { CreateOpdSheetInput, UpdateOpdSheetInput } from '../validators/opdSheet.validator.js';

export const createOpdSheetService = async (data: CreateOpdSheetInput) => {
    // Ensure unique date
    const existing = await prisma.opdSheet.findUnique({
        where: { sheetDateBs: data.sheetDateBs },
    });

    if (existing) {
        throw new AppError(
            `An OPD sheet for date ${data.sheetDateBs} already exists`,
            409
        );
    }

    const sheet = await prisma.opdSheet.create({
        data: {
            sheetDateBs: data.sheetDateBs,
            sheetMonth: data.sheetMonth ?? null,
            notes: data.notes ?? null,
        },
    });

    return sheet;
};

export const getOpdSheetsService = async (filters: {
    startDate?: string;
    endDate?: string;
    month?: string;
}) => {
    const whereClause: Record<string, unknown> = {};

    if (filters.month) {
        whereClause.sheetMonth = filters.month.toUpperCase();
    }

    // For BS date range filtering, simple string comparison works (YYYY-MM-DD lexicographic)
    if (filters.startDate || filters.endDate) {
        whereClause.sheetDateBs = {
            ...(filters.startDate ? { gte: filters.startDate } : {}),
            ...(filters.endDate ? { lte: filters.endDate } : {}),
        };
    }

    const sheets = await prisma.opdSheet.findMany({
        where: whereClause,
        orderBy: { sheetDateBs: 'desc' },
        include: {
            _count: { select: { entries: true } },
        },
    });

    return sheets;
};

export const getOpdSheetByIdService = async (id: string) => {
    const sheet = await prisma.opdSheet.findUnique({
        where: { id },
        include: {
            entries: {
                orderBy: { createdAt: 'asc' },
                include: {
                    doctor: { select: { id: true, fullName: true } },
                },
            },
        },
    });

    if (!sheet) {
        throw new AppError('OPD sheet not found', 404);
    }

    return sheet;
};

export const updateOpdSheetService = async (
    id: string,
    data: UpdateOpdSheetInput
) => {
    const sheet = await prisma.opdSheet.findUnique({ where: { id } });

    if (!sheet) {
        throw new AppError('OPD sheet not found', 404);
    }

    // Check for duplicate date if changing date
    if (data.sheetDateBs && data.sheetDateBs !== sheet.sheetDateBs) {
        const existing = await prisma.opdSheet.findUnique({
            where: { sheetDateBs: data.sheetDateBs },
        });
        if (existing) {
            throw new AppError(
                `An OPD sheet for date ${data.sheetDateBs} already exists`,
                409
            );
        }
    }

    const updated = await prisma.opdSheet.update({
        where: { id },
        data,
    });

    return updated;
};

export const deleteOpdSheetService = async (id: string) => {
    const sheet = await prisma.opdSheet.findUnique({ where: { id } });

    if (!sheet) {
        throw new AppError('OPD sheet not found', 404);
    }

    // Hard delete — entries are cascade deleted via Prisma schema
    await prisma.opdSheet.delete({ where: { id } });

    return { message: 'OPD sheet deleted successfully' };
};
