import { Pool } from 'pg';
import { config } from '../config/index.js';

const poolConfig = {
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
};

if (config.db.ssl) {
    poolConfig.ssl = config.db.ssl;
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

