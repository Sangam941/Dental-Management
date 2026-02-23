import { z } from 'zod';

// BS date format: "YYYY-MM-DD" e.g. "2082-11-05"
const bsDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const createOpdSheetSchema = z.object({
    body: z.object({
        sheetDateBs: z
            .string({ required_error: 'Sheet date (BS) is required' })
            .regex(bsDateRegex, 'Date must be in YYYY-MM-DD format (Bikram Sambat)'),
        sheetMonth: z.string().max(20).optional().nullable(),
        notes: z.string().max(500).optional().nullable(),
    }),
});

export const updateOpdSheetSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Sheet ID is required' }).uuid('Invalid sheet ID'),
    }),
    body: z.object({
        sheetDateBs: z
            .string()
            .regex(bsDateRegex, 'Date must be in YYYY-MM-DD format')
            .optional(),
        sheetMonth: z.string().max(20).optional().nullable(),
        notes: z.string().max(500).optional().nullable(),
    }),
});

export const opdSheetIdParamSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Sheet ID is required' }).uuid('Invalid sheet ID'),
    }),
});

export const queryOpdSheetSchema = z.object({
    query: z.object({
        startDate: z.string().regex(bsDateRegex).optional(),
        endDate: z.string().regex(bsDateRegex).optional(),
        month: z.string().max(20).optional(),
    }),
});

export type CreateOpdSheetInput = z.infer<typeof createOpdSheetSchema>['body'];
export type UpdateOpdSheetInput = z.infer<typeof updateOpdSheetSchema>['body'];
