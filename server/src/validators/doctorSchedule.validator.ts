import { z } from 'zod';

// Helper: parse "HH:mm" string into a Date object
const timeStringSchema = z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format (e.g. 09:00)');

const dayOfWeekValues = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export const createScheduleSchema = z
    .object({
        params: z.object({
            id: z.string({ required_error: 'Doctor ID is required' }).uuid('Invalid doctor ID'),
        }),
        body: z
            .object({
                dayOfWeek: z.enum(dayOfWeekValues, {
                    required_error: 'Day of week is required',
                    message: 'Day must be one of SUN, MON, TUE, WED, THU, FRI, SAT',
                }),
                startTime: timeStringSchema,
                endTime: timeStringSchema,
                room: z.string().max(50, 'Room name too long').optional().nullable(),
            })
            .refine(
                (data) => data.startTime < data.endTime,
                { message: 'Start time must be before end time', path: ['endTime'] }
            ),
    });

export const updateScheduleSchema = z.object({
    params: z.object({
        scheduleId: z
            .string({ required_error: 'Schedule ID is required' })
            .uuid('Invalid schedule ID'),
    }),
    body: z
        .object({
            dayOfWeek: z.enum(dayOfWeekValues).optional(),
            startTime: timeStringSchema.optional(),
            endTime: timeStringSchema.optional(),
            room: z.string().max(50).optional().nullable(),
            isActive: z.boolean().optional(),
        })
        .refine(
            (data) => {
                if (data.startTime && data.endTime) {
                    return data.startTime < data.endTime;
                }
                return true;
            },
            { message: 'Start time must be before end time', path: ['endTime'] }
        ),
});

export const scheduleIdParamSchema = z.object({
    params: z.object({
        scheduleId: z
            .string({ required_error: 'Schedule ID is required' })
            .uuid('Invalid schedule ID'),
    }),
});

export type CreateScheduleBody = z.infer<typeof createScheduleSchema>['body'];
export type UpdateScheduleBody = z.infer<typeof updateScheduleSchema>['body'];
