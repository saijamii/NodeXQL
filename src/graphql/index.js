import { authorTypeDefs } from './schema/author.graphql.js';
import { bookTypeDefs } from './schema/book.graphql.js';
import { authorResolvers } from './resolvers/author.resolver.js';
import { bookResolvers } from './resolvers/book.resolver.js';

// Combine type definitions - Apollo Server accepts array of typeDefs
export const typeDefs = [authorTypeDefs, bookTypeDefs];

// Combine resolvers
export const resolvers = {
    Query: {
        ...authorResolvers.Query,
        ...bookResolvers.Query,
    },
    Author: {
        ...authorResolvers.Author,
    },
    Book: {
        ...bookResolvers.Book,
    },
};

