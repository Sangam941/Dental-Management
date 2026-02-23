import type { Request, Response, NextFunction } from 'express';
import * as doctorService from '../service/doctor.service.js';
import { AppError } from '../utils/appError.js';
import type { DayOfWeek } from '@prisma/client';

export const createDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const doctor = await doctorService.createDoctorService(req.body);
        res.status(201).json({ message: 'Doctor created successfully', doctor });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to create doctor', 500));
    }
};

export const getDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const departmentId = req.query.departmentId as string | undefined;
        const activeOnly = req.query.activeOnly === 'true';
        const doctors = await doctorService.getDoctorsService(departmentId, activeOnly);
        res.status(200).json({ doctors });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch doctors', 500));
    }
};

export const getDoctorById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const doctor = await doctorService.getDoctorByIdService(id);
        res.status(200).json({ doctor });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch doctor', 500));
    }
};

export const updateDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const doctor = await doctorService.updateDoctorService(id, req.body);
        res.status(200).json({ message: 'Doctor updated successfully', doctor });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to update doctor', 500));
    }
};

export const deleteDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        await doctorService.deleteDoctorService(id);
        res.status(200).json({ message: 'Doctor deactivated successfully' });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to delete doctor', 500));
    }
};

export const getDoctorAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const day = req.query.day as string;
        const validDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

        if (!day || !validDays.includes(day.toUpperCase())) {
            return next(
                new AppError(`Invalid day. Must be one of: ${validDays.join(', ')}`, 400)
            );
        }

        const availability = await doctorService.getDoctorAvailabilityService(
            day.toUpperCase() as DayOfWeek
        );
        res.status(200).json({ day: day.toUpperCase(), doctors: availability });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch doctor availability', 500));
    }
};
