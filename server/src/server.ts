import app from './app.js';
import { config } from './config/env.js';
import prisma from './config/prisma.js';

const startServer = async () => {
    try {
        // Verify database connection
        await prisma.$connect();
        console.log('Database connected successfully');

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
            console.log(`API: http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
};


startServer();
