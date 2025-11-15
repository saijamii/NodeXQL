import { pool } from '../../db/index.js';

// Get all authors
export async function getAllAuthors() {
    try {
        const res = await pool.query('SELECT * FROM author.authors ORDER BY id');
        return res.rows;
    } catch (err) {
        console.error('Error getting authors:', err.message || err);
        throw err;
    }
}

// Get author by ID
export async function getAuthorById(id) {
    try {
        const res = await pool.query('SELECT * FROM author.authors WHERE id = $1', [id]);
        return res.rows[0] || null;
    } catch (err) {
        console.error('Error getting author by id:', err.message || err);
        throw err;
    }
}

