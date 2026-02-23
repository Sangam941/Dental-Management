import type { Request, Response, NextFunction } from 'express';
import * as authService from '../service/auth.service.js';
import { AppError } from '../utils/appError.js';

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await authService.loginUserService(req.body);
        res.status(200).json(result);
    } catch (error: unknown) {
        if (error instanceof AppError) {
            return next(error);
        }
        next(new AppError('Login failed. Please try again.', 500));
    }
};

export const logoutUser = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const result = authService.logoutUserService();
        res.status(200).json(result);
    } catch (error: unknown) {
        next(new AppError('Logout failed', 500));
    }
};
