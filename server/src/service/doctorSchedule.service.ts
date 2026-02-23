import prisma from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type { DayOfWeek } from '@prisma/client';
import type {
    CreateScheduleBody,
    UpdateScheduleBody,
} from '../validators/doctorSchedule.validator.ts';

// Convert "HH:mm" string to a DateTime (using 1970-01-01 as base date)
const timeStringToDate = (time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0, 0));
};

// Format stored DateTime back to "HH:mm" string for response
const dateToTimeString = (date: Date): string => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const formatSchedule = (schedule: {
    id: string;
    doctorId: string;
    dayOfWeek: DayOfWeek;
    startTime: Date;
    endTime: Date;
    room: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}) => ({
    ...schedule,
    startTime: dateToTimeString(schedule.startTime),
    endTime: dateToTimeString(schedule.endTime),
});

// Check if two time ranges overlap
const timesOverlap = (
    existingStart: Date,
    existingEnd: Date,
    newStart: Date,
    newEnd: Date
): boolean => {
    return newStart < existingEnd && newEnd > existingStart;
};

export const createScheduleService = async (
    doctorId: string,
    data: CreateScheduleBody
) => {
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) throw new AppError('Doctor not found', 404);
    if (!doctor.isActive) throw new AppError('Cannot add schedule to an inactive doctor', 400);

    const newStart = timeStringToDate(data.startTime);
    const newEnd = timeStringToDate(data.endTime);

    // Check for overlapping schedules on same doctor + day
    const existing = await prisma.doctorSchedule.findMany({
        where: { doctorId, dayOfWeek: data.dayOfWeek, isActive: true },
    });

    const hasOverlap = existing.some((s: any) =>
        timesOverlap(s.startTime, s.endTime, newStart, newEnd)
    );

    if (hasOverlap) {
        throw new AppError(
            `This doctor already has a schedule that overlaps on ${data.dayOfWeek}`,
            409
        );
    }

    const schedule = await prisma.doctorSchedule.create({
        data: {
            doctorId,
            dayOfWeek: data.dayOfWeek,
            startTime: newStart,
            endTime: newEnd,
            room: data.room ?? null,
        },
    });

    return formatSchedule(schedule);
};

export const getSchedulesByDoctorService = async (doctorId: string) => {
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) throw new AppError('Doctor not found', 404);

    const schedules = await prisma.doctorSchedule.findMany({
        where: { doctorId },
        orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return schedules.map(formatSchedule);
};

export const updateScheduleService = async (
    scheduleId: string,
    data: UpdateScheduleBody
) => {
    const schedule = await prisma.doctorSchedule.findUnique({
        where: { id: scheduleId },
    });

    if (!schedule) throw new AppError('Schedule not found', 404);

    const newStart = data.startTime
        ? timeStringToDate(data.startTime)
        : schedule.startTime;
    const newEnd = data.endTime
        ? timeStringToDate(data.endTime)
        : schedule.endTime;
    const targetDay = data.dayOfWeek ?? schedule.dayOfWeek;

    // Check overlap — exclude the current schedule from check
    const existing = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: schedule.doctorId,
            dayOfWeek: targetDay,
            isActive: true,
            NOT: { id: scheduleId },
        },
    });

    const hasOverlap = existing.some((s: any) =>
        timesOverlap(s.startTime, s.endTime, newStart, newEnd)
    );

    if (hasOverlap) {
        throw new AppError(
            `This doctor already has a schedule that overlaps on ${targetDay}`,
            409
        );
    }

    const updated = await prisma.doctorSchedule.update({
        where: { id: scheduleId },
        data: {
            ...(data.dayOfWeek && { dayOfWeek: data.dayOfWeek }),
            ...(data.startTime && { startTime: newStart }),
            ...(data.endTime && { endTime: newEnd }),
            ...(data.room !== undefined && { room: data.room }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
    });

    return formatSchedule(updated);
};

export const deleteScheduleService = async (scheduleId: string) => {
    const schedule = await prisma.doctorSchedule.findUnique({
        where: { id: scheduleId },
    });

    if (!schedule) throw new AppError('Schedule not found', 404);

    await prisma.doctorSchedule.delete({ where: { id: scheduleId } });

    return { message: 'Schedule deleted successfully' };
};
