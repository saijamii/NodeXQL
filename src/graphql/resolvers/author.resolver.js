import { getAllAuthors, getAuthorById } from '../../services/author.service.js';
import { getBooksByAuthorId } from '../../services/book.service.js';

export const authorResolvers = {
    Query: {
        authors: async () => {
            return await getAllAuthors();
        },
        author: async (_, args) => {
            return await getAuthorById(args.id);
        },
    },
    Author: {
        books: async (author, args, context) => {
            return await getBooksByAuthorId(author.id);
        }
    },
};

