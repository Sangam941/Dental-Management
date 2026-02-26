import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';

// Routers
import authRouter from './routes/auth.router.js';
import departmentRouter from './routes/department.router.js';
import doctorRouter from './routes/doctor.router.js';
import doctorScheduleRouter from './routes/doctorSchedule.router.js';
import opdEntryRouter from './routes/opdEntry.router.js';

import { AppError } from './utils/appError.js';

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check 
app.get('/', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Clinic Center API is running',
        version: '1.0.0',
    });
});

// Routes 
app.use('/auth', authRouter);
app.use('/departments', departmentRouter);
app.use('/doctors', doctorRouter);
app.use('/doctor-schedules', doctorScheduleRouter);
app.use('/opd-entries', opdEntryRouter);

//  404 Handler 
app.use((_req, _res, next) => {
    next(new AppError('Route not found', 404));
});

// Global Error Handler 
app.use(
    (
        err: AppError | Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        const isAppError = err instanceof AppError;
        const statusCode = isAppError ? err.statusCode : 500;
        const status = isAppError ? err.status : 'error';
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).json({
            status,
            message,
            ...(config.nodeEnv === 'development' && { stack: err.stack }),
        });
    }
);

export default app;
