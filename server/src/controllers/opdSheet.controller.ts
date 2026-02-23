import type { Request, Response, NextFunction } from 'express';
import * as opdSheetService from '../service/opdSheet.service.js';
import { AppError } from '../utils/appError.js';

export const createOpdSheet = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const sheet = await opdSheetService.createOpdSheetService(req.body);
        res.status(201).json({ message: 'OPD sheet created successfully', sheet });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to create OPD sheet', 500));
    }
};

export const getOpdSheets = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { startDate, endDate, month } = req.query as Record<string, string | undefined>;
        const sheets = await opdSheetService.getOpdSheetsService({
            startDate,
            endDate,
            month,
        });
        res.status(200).json({ sheets });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch OPD sheets', 500));
    }
};

export const getOpdSheetById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const sheet = await opdSheetService.getOpdSheetByIdService(id);
        res.status(200).json({ sheet });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch OPD sheet', 500));
    }
};

export const updateOpdSheet = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const sheet = await opdSheetService.updateOpdSheetService(id, req.body);
        res.status(200).json({ message: 'OPD sheet updated successfully', sheet });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to update OPD sheet', 500));
    }
};

export const deleteOpdSheet = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        await opdSheetService.deleteOpdSheetService(id);
        res.status(200).json({ message: 'OPD sheet deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to delete OPD sheet', 500));
    }
};
