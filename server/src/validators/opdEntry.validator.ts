import { z } from 'zod';

const caseTypeValues = ['NEW', 'OLD'] as const;
const paymentMethodValues = ['CASH', 'ONLINE', 'CARD', 'OTHER'] as const;

export const createOpdEntrySchema = z.object({
    body: z.object({
        entryDateBs: z
            .string({ required_error: 'Entry date is required' })
            .min(1, 'Entry date cannot be empty'),
        entryMonth: z.string().optional().nullable(),
        notes: z.string().max(1000).optional().nullable(),
        caseType: z.enum(caseTypeValues, {
            required_error: 'Case type is required',
            message: 'Case type must be NEW or OLD',
        }),
        regNo: z.string().max(50).optional().nullable(),
        patientName: z
            .string({ required_error: 'Patient name is required' })
            .min(1, 'Patient name cannot be empty')
            .max(150),
        age: z.number().int().min(0).max(150).optional().nullable(),
        address: z.string().max(255).optional().nullable(),
        phoneNo: z.string().max(20).optional().nullable(),
        treatment: z.string().max(500).optional().nullable(),
        doctorId: z.string().uuid('Invalid doctor ID').optional().nullable(),
        totalAmount: z.number().min(0).optional().nullable().default(0),
        paymentMethod: z.enum(paymentMethodValues).optional().nullable().default('CASH'),
        paidAmount: z.number().min(0).optional().nullable().default(0),
        expenseAmount: z.number().min(0).optional().nullable().default(0),
    }),
});

export const updateOpdEntrySchema = z.object({
    params: z.object({
        entryId: z
            .string({ required_error: 'Entry ID is required' })
            .uuid('Invalid entry ID'),
    }),
    body: z.object({
        entryDateBs: z.string().min(1).optional(),
        entryMonth: z.string().optional().nullable(),
        notes: z.string().max(1000).optional().nullable(),
        caseType: z.enum(caseTypeValues).optional(),
        regNo: z.string().max(50).optional().nullable(),
        patientName: z.string().min(1).max(150).optional(),
        age: z.number().int().min(0).max(150).optional().nullable(),
        address: z.string().max(255).optional().nullable(),
        phoneNo: z.string().max(20).optional().nullable(),
        treatment: z.string().max(500).optional().nullable(),
        doctorId: z.string().uuid('Invalid doctor ID').optional().nullable(),
        totalAmount: z.number().min(0).optional(),
        paymentMethod: z.enum(paymentMethodValues).optional(),
        paidAmount: z.number().min(0).optional(),
        expenseAmount: z.number().min(0).optional(),
    }),
});

export const getOpdEntriesSchema = z.object({
    query: z.object({
        doctorId: z.string().uuid().optional(),
        entryMonth: z.string().optional(),
        entryDateBs: z.string().optional(),
    }),
});

export const opdEntryIdParamSchema = z.object({
    params: z.object({
        entryId: z
            .string({ required_error: 'Entry ID is required' })
            .uuid('Invalid entry ID'),
    }),
});

export type CreateOpdEntryInput = z.infer<typeof createOpdEntrySchema>['body'];
export type UpdateOpdEntryInput = z.infer<typeof updateOpdEntrySchema>['body'];
