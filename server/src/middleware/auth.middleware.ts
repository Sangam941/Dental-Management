import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';
import prisma from '../config/prisma.js';
import { verifyToken } from '../helpers/token.js';
import type { AdminProfile } from '@prisma/client';

// Extend express Request to carry the authenticated admin
declare global {
    namespace Express {
        interface Request {
            admin?: AdminProfile;
        }
    }
}

export const protect = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError('Token missing. Please log in again.', 401));
    }

    try {
        const decoded = verifyToken(token);

        const admin = await prisma.adminProfile.findUnique({
            where: { id: decoded.userId },
        });

        if (!admin) {
            return next(new AppError('The admin account no longer exists.', 401));
        }

        req.admin = admin;
        next();
    } catch {
        return next(new AppError('Invalid or expired token. Please log in again.', 401));
    }
};
