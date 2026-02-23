import type { Request, Response, NextFunction } from 'express';
import * as scheduleService from '../service/doctorSchedule.service.js';
import { AppError } from '../utils/appError.js';

export const createSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const schedule = await scheduleService.createScheduleService(
            id,
            req.body
        );
        res.status(201).json({ message: 'Schedule created successfully', schedule });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to create schedule', 500));
    }
};

export const getSchedulesByDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const schedules = await scheduleService.getSchedulesByDoctorService(id);
        res.status(200).json({ schedules });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch schedules', 500));
    }
};

export const updateSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { scheduleId } = req.params as { scheduleId: string };
        const schedule = await scheduleService.updateScheduleService(
            scheduleId,
            req.body
        );
        res.status(200).json({ message: 'Schedule updated successfully', schedule });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to update schedule', 500));
    }
};

export const deleteSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { scheduleId } = req.params as { scheduleId: string };
        await scheduleService.deleteScheduleService(scheduleId);
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to delete schedule', 500));
    }
};
