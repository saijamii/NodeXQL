import 'dotenv/config';

export const config = {
    port: process.env.PORT || 4000,
    db: {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        ssl: process.env.PGSSLMODE === 'require' || process.env.PGSSLMODE === 'true' 
            ? { rejectUnauthorized: false } 
            : false,
    },
};

