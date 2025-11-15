export const bookTypeDefs = `#graphql
type Book {
  id: ID!
  title: String!
  publishedYear: Int
  author: Author
}

extend type Query {
  books: [Book]
  book(id: ID!): Book
}`;

