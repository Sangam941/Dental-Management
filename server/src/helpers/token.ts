import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface JwtPayload {
    userId: string;
    email: string;
}

export const createAccessToken = (userId: string, email: string): string => {
    return jwt.sign(
        { userId, email } satisfies JwtPayload,
        config.jwtSecret,
        { expiresIn: '7d' }
    );
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, config.jwtSecret) as JwtPayload;
    } catch {
        throw new Error('Invalid or expired token');
    }
};
