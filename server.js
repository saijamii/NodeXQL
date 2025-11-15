import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { pool, testConnection } from './db/index.js';
import { typeDefs, resolvers } from './src/graphql/index.js';
import { buildContext } from './src/context/index.js';
import { config } from './config/index.js';
import healthRouter from './src/routes/health.route.js';

async function start() {
    await testConnection();

    const app = express();

    // Health check route
    app.use(healthRouter);

    // Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: buildContext,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const httpServer = app.listen(config.port, () => {
        console.log(`Server ready at http://localhost:${config.port}${server.graphqlPath}`);
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
