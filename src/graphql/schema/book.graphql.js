export const bookTypeDefs = `#graphql
type Book {
  id: ID!
  title: String!
  published_year: Int
  cover_url: String
  price: Float!
  created_at: String
  updated_at: String
}

extend type Query {
  books: [Book]
  book(id: ID!): Book
}`;

