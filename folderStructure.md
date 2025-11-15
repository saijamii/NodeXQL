NodeXQL/
├── package.json
├── server.js                 # app entry (ESM)
├── config/
│  └── index.js               # central config (env, constants)
├── db/
│  ├── index.js               # exports `pool` and helpers (pg)
│  └── migrations/            # SQL migration files (optional)
├── src/
│  ├── graphql/
│  │  ├── schema/             # typeDefs split by feature
│  │  │  ├── author.graphql.js
│  │  │  └── book.graphql.js
│  │  ├── resolvers/          # resolvers grouped by feature
│  │  │  ├── author.resolver.js
│  │  │  └── book.resolver.js
│  │  └── index.js            # combines typeDefs + resolvers and exports
│  ├── services/              # business logic, DB calls (one per domain)
│  │  ├── author.service.js
│  │  └── book.service.js
│  ├── repositories/          # thin DB layer (optional, useful with Prisma)
│  ├── loaders/               # DataLoader or batch loaders to avoid N+1
│  ├── routes/                # any REST endpoints (health, admin)
│  │  └── health.route.js
│  ├── utils/                 # utilities: logger, errors, validators
│  ├── middlewares/           # express middlewares (auth, errorHandler)
│  └── context/               # GraphQL context builder (attach db, auth)
│     └── index.js
└── scripts/                  # helper scripts (seed, create schema)