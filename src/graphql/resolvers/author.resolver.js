import { getAllAuthors, getAuthorById } from '../../services/author.service.js';
import { getBooksByAuthorId } from '../../services/book.service.js';

export const authorResolvers = {
    Query: {
        authors: async () => {
            return await getAllAuthors();
        },
        author: async (parent, args) => {
            return await getAuthorById(args.id);
        },
    },
    Author: {
        books: async (parent) => {
            return await getBooksByAuthorId(parent.id);
        },
    },
};

