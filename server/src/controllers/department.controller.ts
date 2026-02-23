import type { Request, Response, NextFunction } from 'express';
import * as departmentService from '../service/department.service.js';
import { AppError } from '../utils/appError.js';

export const createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const department = await departmentService.createDepartmentService(req.body);
        res.status(201).json({ message: 'Department created successfully', department });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to create department', 500));
    }
};

export const getDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const activeOnly = req.query.activeOnly === 'true';
        const departments = await departmentService.getDepartmentsService(activeOnly);
        res.status(200).json({ departments });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to fetch departments', 500));
    }
};

export const updateDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const department = await departmentService.updateDepartmentService(
            id,
            req.body
        );
        res.status(200).json({ message: 'Department updated successfully', department });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to update department', 500));
    }
};

export const deleteDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        await departmentService.deleteDepartmentService(id);
        res.status(200).json({ message: 'Department deactivated successfully' });
    } catch (error: unknown) {
        if (error instanceof AppError) return next(error);
        next(new AppError('Failed to delete department', 500));
    }
};
