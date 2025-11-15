import 'dotenv/config';
import { Pool } from 'pg';

const poolConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
};

// If using a cloud provider that requires SSL (e.g., Supabase, Neon), enable it:
if (process.env.PGSSLMODE === 'require' || process.env.PGSSLMODE === 'true') {
    poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

// simple test connection
async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Postgres connected:', res.rows[0].now);
    } catch (err) {
        console.error('Postgres connection error:', err.message || err);
        // rethrow so caller can decide (e.g., exit)
        throw err;
    }
}

export { pool, testConnection };
