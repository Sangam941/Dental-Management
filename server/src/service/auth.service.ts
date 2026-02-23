import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { createAccessToken } from '../helpers/token.js';
import { AppError } from '../utils/appError.js';
import type { LoginInput } from '../validators/auth.validator.js';

export const loginUserService = async ({ email, password }: LoginInput) => {
    // Find admin by email
    const admin = await prisma.adminProfile.findUnique({
        where: { email },
    });

    if (!admin) {
        throw new AppError('Invalid email or password', 401);
    }

    // Compare provided password with shared password (plain text)
    const isPasswordValid = password === admin.password;

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = createAccessToken(admin.id, admin.email);

    return {
        message: 'Login successful',
        admin: {
            id: admin.id,
            email: admin.email,
        },
        token,
    };
};

export const logoutUserService = () => {
    return {
        message: 'Logout successful',
    };
};
