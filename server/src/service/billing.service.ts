import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import { Prisma } from '@prisma/client';
import type { CreateBillingInput, UpdateBillingInput } from '../validators/billing.validator.js';

const computeDueAmount = (total: number, paid: number): number => {
    return Math.max(0, total - paid);
};

export const createBillingService = async (data: CreateBillingInput) => {
    const opdEntry = await prisma.opdEntry.findUnique({ where: { id: data.opdEntryId } });
    if (!opdEntry) throw new AppError('OPD Entry not found', 404);

    const totalAmount = data.totalAmount ?? 0;
    const paidAmount = data.paidAmount ?? 0;
    const dueAmount = computeDueAmount(totalAmount, paidAmount);

    const billing = await prisma.billing.create({
        data: {
            opdEntryId: data.opdEntryId,
            totalAmount: new Prisma.Decimal(totalAmount),
            paymentMethod: data.paymentMethod as any,
            paidAmount: new Prisma.Decimal(paidAmount),
            dueAmount: new Prisma.Decimal(dueAmount),
            expenseAmount: new Prisma.Decimal(data.expenseAmount ?? 0),
        },
    });

    return billing;
};

export const getBillingsService = async () => {
    return await prisma.billing.findMany({
        orderBy: { createdAt: 'desc' },
        include: { 
            opdEntry: { 
                include: { 
                    doctor: { select: { id:true, fullName: true } }
                }
            }
        },
    });
};

export const getBillingByIdService = async (id: string) => {
    const billing = await prisma.billing.findUnique({
        where: { id },
        include: { opdEntry: { select: { fullName: true, regNo: true } } },
    });
    if (!billing) throw new AppError('Billing record not found', 404);
    return billing;
};

export const updateBillingService = async (id: string, data: UpdateBillingInput) => {
    const billing = await prisma.billing.findUnique({ where: { id } });
    if (!billing) throw new AppError('Billing record not found', 404);

    const totalAmount = data.totalAmount !== undefined ? data.totalAmount : Number(billing.totalAmount);
    const paidAmount = data.paidAmount !== undefined ? data.paidAmount : Number(billing.paidAmount);
    const dueAmount = computeDueAmount(totalAmount, paidAmount);

    const updated = await prisma.billing.update({
        where: { id },
        data: {
            totalAmount: new Prisma.Decimal(totalAmount),
            paidAmount: new Prisma.Decimal(paidAmount),
            dueAmount: new Prisma.Decimal(dueAmount),
            paymentMethod: data.paymentMethod !== undefined ? (data.paymentMethod as any) : undefined,
            expenseAmount: data.expenseAmount !== undefined ? new Prisma.Decimal(data.expenseAmount) : undefined,
        },
    });

    return updated;
};

export const deleteBillingService = async (id: string) => {
    const billing = await prisma.billing.findUnique({ where: { id } });
    if (!billing) throw new AppError('Billing record not found', 404);

    await prisma.billing.delete({ where: { id } });
    return { message: 'Billing record deleted successfully' };
};
