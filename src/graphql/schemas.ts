export const typeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    taxId: String!
    password: String!
  }

  type Account {
    _id: ID!
    numberAccount: String!
    userId: User!
    balance: Float!
  }

  type Transaction {
    _id: ID!
    sender: User!
    receiver: User!
    value: Float!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    userTaxId(taxId: String!): User
    user(id: ID!): User
    accountById(userId: ID!): Account
    account(id: ID!): Account
    transactions: [Transaction]
    transactionBySender(senderId: ID!): [Transaction]
    transactionByReceiver(receiverId: ID!): [Transaction]
  }

  type UserAccount {
    user: User!
    account: Account!
    token: String!
  }

  type Mutation {
    createUser(data: CreateUserInput!): UserAccount
    addTransaction(transaction: AddTransactionInput!): Transaction
    login(login: Login!): Auth
  }

  input CreateUserInput {
    name: String!
    taxId: String!
    password: String!
  }

  input AddTransactionInput {
    sender: ID!
    receiver: ID!
    value: Float!
  }

  input Login {
    taxId: String!
    password: String!
  }
`;
