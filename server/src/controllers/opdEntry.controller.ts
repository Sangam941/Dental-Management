import type { Request, Response, NextFunction } from 'express';
import * as opdEntryService from '../service/opdEntry.service.js';
import { AppError } from '../utils/appError.js';

export const createOpdEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const entry = await opdEntryService.createOpdEntryService(
            req.body
        );
        res.status(201).json({ message: 'OPD entry created successfully', entry });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to create OPD entry', 500));
    }
};

export const getOpdEntries = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { doctorId, entryMonth, entryDateBs } = req.query as {
            doctorId?: string;
            entryMonth?: string;
            entryDateBs?: string;
        };
        const entries = await opdEntryService.getOpdEntriesService({
            doctorId,
            entryMonth,
            entryDateBs,
        });
        res.status(200).json({ entries });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch OPD entries', 500));
    }
};

export const getOpdEntryById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { entryId } = req.params as { entryId: string };
        const entry = await opdEntryService.getOpdEntryByIdService(entryId);
        res.status(200).json({ entry });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch OPD entry', 500));
    }
};

export const updateOpdEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { entryId } = req.params as { entryId: string };
        const entry = await opdEntryService.updateOpdEntryService(
            entryId,
            req.body
        );
        res.status(200).json({ message: 'OPD entry updated successfully', entry });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to update OPD entry', 500));
    }
};

export const deleteOpdEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { entryId } = req.params as { entryId: string };
        await opdEntryService.deleteOpdEntryService(entryId);
        res.status(200).json({ message: 'OPD entry deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to delete OPD entry', 500));
    }
};
