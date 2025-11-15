import { pool } from '../../db/index.js';

// Get all books
export async function getAllBooks() {
    try {
        const res = await pool.query('SELECT * FROM author.books ORDER BY id');
        return res.rows;
    } catch (err) {
        console.error('Error getting books:', err.message || err);
        throw err;
    }
}

// Get book by ID
export async function getBookById(id) {
    try {
        const res = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        return res.rows[0] || null;
    } catch (err) {
        console.error('Error getting book by id:', err.message || err);
        throw err;
    }
}

// Get books by author ID
export async function getBooksByAuthorId(authorId) {
    try {
        const res = await pool.query('SELECT * FROM books WHERE author_id = $1 ORDER BY id', [authorId]);
        return res.rows;
    } catch (err) {
        console.error('Error getting books by author id:', err.message || err);
        throw err;
    }
}

