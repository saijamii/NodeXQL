import { getAllBooks, getBookById } from '../../services/book.service.js';
import { getAuthorById } from '../../services/author.service.js';

export const bookResolvers = {
    Query: {
        books: async () => {
            return await getAllBooks();
        },
        book: async (parent, args) => {
            return await getBookById(args.id);
        },
    },
    Book: {
        author: async (parent) => {
            if (parent.author_id) {
                return await getAuthorById(parent.author_id);
            }
            return null;
        },
        publishedYear: (parent) => {
            // Map published_year (snake_case) to publishedYear (camelCase)
            return parent.published_year || parent.publishedYear;
        },
    },
};

