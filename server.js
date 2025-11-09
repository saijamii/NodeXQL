const { ApolloServer } = require('apollo-server-express');
const express = require('express');

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

(async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs, resolvers
    })
    await server.start()
    server.applyMiddleware({
        app, path: "/graphql"
    })
    app.listen(4000, () => {
        console.log('server is runing on PORT 4000/graphql');
    })
})()
