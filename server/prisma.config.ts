import 'dotenv/config'
import { defineConfig, env } from "prisma/config"

export default defineConfig({
    migrations: {
        seed: 'node --loader ts-node/esm prisma/seed.ts',
    },
    schema: 'prisma/schema.prisma',
    datasource: {
        url: env('DATABASE_URL'),
    },
})
