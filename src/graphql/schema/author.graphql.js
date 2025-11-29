export const authorTypeDefs = `#graphql
type Author {
  id: ID!
  name: String!
  email: String!
  bio: String
  createdAt: String!
  updatedAt: String!
  books: [Book]!
}

type Query {
  authors: [Author]
  author(id: ID!): Author
}`;

