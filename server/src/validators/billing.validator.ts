import { z } from 'zod';

const paymentMethodValues = ['CASH', 'ONLINE', 'CARD', 'OTHER'] as const;

export const createBillingSchema = z.object({
    body: z.object({
        opdEntryId: z.string({ required_error: 'OPD Entry ID is required' }).uuid('Invalid OPD Entry ID'),
        totalAmount: z.number().min(0).optional().default(0),
        paymentMethod: z.enum(paymentMethodValues).optional().default('CASH'),
        paidAmount: z.number().min(0).optional().default(0),
        expenseAmount: z.number().min(0).optional().default(0),
    }),
});

export const updateBillingSchema = z.object({
    params: z.object({
        billingId: z.string({ required_error: 'Billing ID is required' }).uuid('Invalid Billing ID'),
    }),
    body: z.object({
        totalAmount: z.number().min(0).optional(),
        paymentMethod: z.enum(paymentMethodValues).optional(),
        paidAmount: z.number().min(0).optional(),
        expenseAmount: z.number().min(0).optional(),
    }),
});

export const billingIdParamSchema = z.object({
    params: z.object({
        billingId: z.string({ required_error: 'Billing ID is required' }).uuid('Invalid Billing ID'),
    }),
});

export type CreateBillingInput = z.infer<typeof createBillingSchema>['body'];
export type UpdateBillingInput = z.infer<typeof updateBillingSchema>['body'];
