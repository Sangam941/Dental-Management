import type { Request, Response, NextFunction } from 'express';
import { type ZodSchema } from 'zod';
import { AppError } from '../utils/appError.js';

export const validate =
    (schema: ZodSchema) =>
        async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
            try {
                if (
                    req.method !== 'GET' && req.method !== 'DELETE' &&
                    (!req.body || (typeof req.body === 'object' && Object.keys(req.body).length === 0 &&
                        Object.keys(req.query).length === 0 && Object.keys(req.params).length === 0))
                ) {
                    return next(new AppError('Request body is required', 400));
                }

                const result = await schema.safeParseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });

                if (!result.success) {
                    const errorMessage = result.error.issues
                        .map((err) => err.message)
                        .join(', ');
                    return next(new AppError(errorMessage, 400));
                }

                return next();
            } catch (error) {
                next(error);
            }
        };
