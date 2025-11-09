require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { ApolloServer } = require('apollo-server-express');
const PORT = process.env.PORT || 4000;

const typeDefs = `#graphql
type Author {
  id: ID!
  name: String!
  books: [Book]
}

type Book {
  id: ID!
  title: String!
  publishedYear: Int
  author: Author
}

type Query {
  authors: [Author]
  author(id: ID!): Author
  books: [Book]
  book(id: ID!): Book
}`

const data = {
    authors: [
        { id: "1", name: "Author 1", bookIds: ["101", "102"] },
        { id: "2", name: "Author 2", bookIds: ["103", "104"] },
        { id: "3", name: "Author 3", bookIds: ["104", "105"] },
    ],
    books: [
        { id: "101", title: "Book 1", publishedYear: 2000, authorId: "1" },
        { id: "102", title: "Book 2", publishedYear: 2000, authorId: "1" },
        { id: "103", title: "Book 3", publishedYear: 2000, authorId: "2" },
        { id: "104", title: "Book 4", publishedYear: 2000, authorId: "2" },
        { id: "105", title: "Book 5", publishedYear: 2000, authorId: "3" },
    ],
};

const resolvers = {
    Query: {
        authors: () => data.authors,
        author: (parent, args) => data.authors.find(a => a.id === args.id),
        books: () => data.books,
        book: (parent, args) => data.books.find(b => b.id === args.id),
    },
};

async function start() {
    const poolConfig = {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432
    };

    // If using a cloud provider that requires SSL (e.g., Supabase, Neon), enable it:
    if (process.env.PGSSLMODE === 'require' || process.env.PGSSLMODE === 'true') {
        poolConfig.ssl = { rejectUnauthorized: false }; // common for demos; in prod use CA certs
    }

    const pool = new Pool(poolConfig);

    try {
        const now = await pool.query('SELECT NOW()');
        console.log('Postgres connected, now():', now.rows[0]);
    } catch (err) {
        console.error('Postgres connection error:', err);
        process.exit(1); // fail fast
    }

    const app = express();

    // Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            // Put things you want resolvers to access in context:
            // e.g., current user (from JWT), and the DB pool.
            // Do NOT put a connected client for every request; use pool for queries.
            return { db: pool, req };
        },
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // simple health endpoint
    app.get('/healthz', (req, res) => res.send({ status: 'ok' }));

    const httpServer = app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
        console.log('Shutting down...');
        await server.stop();
        await pool.end();
        httpServer.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

start().catch(err => {
    console.error('Startup error:', err);
    process.exit(1);
});
