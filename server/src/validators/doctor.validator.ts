import { z } from 'zod';

export const createDoctorSchema = z.object({
    body: z.object({
        fullName: z
            .string({ required_error: 'Doctor full name is required' })
            .min(2, 'Full name must be at least 2 characters')
            .max(150, 'Full name must not exceed 150 characters'),
        phoneNumber: z
            .string()
            .min(7, 'Phone number must be at least 7 characters')
            .max(20, 'Phone number must not exceed 20 characters')
            .optional()
            .nullable(),
        departmentId: z
            .string()
            .uuid('Invalid department ID')
            .optional()
            .nullable(),
    }),
});

export const updateDoctorSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Doctor ID is required' }).uuid('Invalid doctor ID'),
    }),
    body: z.object({
        fullName: z.string().min(2).max(150).optional(),
        phoneNumber: z.string().min(7).max(20).optional().nullable(),
        departmentId: z.string().uuid('Invalid department ID').optional().nullable(),
        isActive: z.boolean().optional(),
    }),
});

export const doctorIdParamSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Doctor ID is required' }).uuid('Invalid doctor ID'),
    }),
});

export type CreateDoctorInput = z.infer<typeof createDoctorSchema>['body'];
export type UpdateDoctorInput = z.infer<typeof updateDoctorSchema>['body'];
