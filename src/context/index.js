import { pool } from '../../db/index.js';

export function buildContext({ req }) {
    return {
        db: pool,
        req,
    };
}

