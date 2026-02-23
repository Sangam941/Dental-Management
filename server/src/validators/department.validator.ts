import { z } from 'zod';

export const createDepartmentSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Department name is required' })
            .min(1, 'Department name cannot be empty')
            .max(100, 'Department name must not exceed 100 characters'),
    }),
});

export const updateDepartmentSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Department ID is required' }).uuid('Invalid department ID'),
    }),
    body: z.object({
        name: z.string().min(1, 'Department name cannot be empty').max(100).optional(),
        isActive: z.boolean().optional(),
    }),
});

export const departmentIdParamSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Department ID is required' }).uuid('Invalid department ID'),
    }),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>['body'];
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>['body'];
