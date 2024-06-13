# koa-mongoose-graphql

Backend deploy: http://35.175.185.117:4000/ (AWS ec2)

front: https://github.com/rafaellevissa/react-relay-graphql

## Challenge

- Backend: MongoDB, NodeJS, Koajs, GraphQL
- Frontend: React, Relay
- Tests: Jest

### Theme - Bank
The theme of the challenge is to create a simple replica of a bank in which it is possible:
- Create an account
- Login
- Send a transaction
- Receive a transaction
- Calculate the available balance of an account

#### Backend
The backend must be a GraphQL API that handles all the required items above.

Stack: NodeJs, KoaJs, MongoDB, GraphQL

Plus: Use Node and Connection from Relay to handle get collection and lists.

#### Login and Register Mutations
- It must have available a Mutation to register a new User.
- This mutation must return the user logged in when successfully.
- It must be available as a Mutation to log in as a User.
- It must handle token authentication for login.
- It must persist the token between requests.
- It must create the token with JWT authentication.
- The token is must be transferred by
- It must create a user with an account

#### User Model
- It must have a first name, tax id (cpf/cnpj field), and password.
- The password must be encrypted.
- It must not be possible to register more than one user with the same tax id.

#### Account Model
- unique ID to be used as idempotency id.
- account number.
- user ID owner of account.
- it must be able to have one account per user.
- it must not be able to duplicate accounts.
- it must have the calculation of balance using a ledger strategy.

#### Transaction Model
- Sender: who is sending the money
- Receiver: who is receiving the money
- It must be idempotent
- Value: in cents or decimal128

#### Deploy
The backend must be deployed where it can be accessible.

#### How to guarantee a better chance of being hired by backend?
- Expose a GraphQL Playground
- Generate a postman JSON to be able to import and make calls to the Backend GraphQL API
- It uses graphql-HTTP
- It has a test with Jest or a Test Runner of choice

### Frontend
- It must have a page to log in or register it.
- Once logged or registered it must return the User logged and show the home page of your challenge.
- It must show the data of the user and account
- It must have an action button to transfer money between accounts
- It must use Shadcn
- It must use Vite with React Router
- It must use [Relay](relay.dev)

#### Deploy
The front end must be deployed where it can be accessible in production to be reviewed by our team.

#### How to guarantee a better chance of being hired by front end?
- Use Shadcn
- Use vite with React Router latest version
- Create a storybook of your UI components
- Create a dash such as a real bank
- It has tested with Jest or a Test Runner of choice
