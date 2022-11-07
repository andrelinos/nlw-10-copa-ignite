# API - NLW 10 COPA /ignite

Projeto desenvolvido durante a Next Level Week Copa, na trilha Ignite.

## Routes for API application (back-end)

---
<br />

| ~**src/routes/auth.ts**

- '**/me**' - get user info
- '**/users**' - get user info from Google and create user info in database.

| ~**src/routes/games.ts**

- '**/polls/:id/games**' - get list games for polls

| ~**src/routes/guess.ts**

- '**/guesses/count**' - get guesses count
- '**/guesses/pollId/games/:gameId/guesses**' - send guess to poll of game

| ~**src/routes/poll.ts**

- '**/polls/count**' - get poll count
- '**/polls**' - create poll (POST)
- '**/polls/join**' - join poll to user id same owner. If owner does not exist, update with first user id as owner..
- '**/polls**' - list polls (GET)
- '**/polls/:id**' - list specific poll from id (GET)

| ~**src/routes/user.ts**

- '**/users/count**' - get users count

| ~**/src/server.ts**

This is a security word in jwt token. Need this, for better security for backend jwt token.

```ts
await fastify.register(jwt, {
  secret: 'nlwcopa',
  })
```

This is the set port to application usage by fastify.

```ts
await fastify.listen({ port: 3333, host: '0.0.0.0' })

```

_Notes_: add host: to work with mobile application

| ~**/src/@types/fastify-jwt.d.ts**
This is a custom types for fastify JWT.

```ts
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
      avatarUrl?: string;
    }
  }
}
```

## Used libs

- [prisma](https://www.npmjs.com/package/prisma) | Prisma is a next-generation ORM that consists tools.
- [zod](https://www.npmjs.com/package/zod) | TypeScript-first schema validation with static type inference
- [fastify](https://www.npmjs.com/package/fastify) | An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and happy users.
- [short-uniq-id](https://www.npmjs.com/package/short-unique-id) | The ability to set a custom dictionary and length means that Short Unique ID.

- [@mermaid-js/mermaid-cli](https://www.npmjs.com/package/@mermaid-js/mermaid-cli) - This is a command-line interface (CLI) for mermaid. It takes a mermaid definition file as input and generates an svg/png/pdf file as output.

- [prisma-erd-generator](https://www.npmjs.com/package/prisma-erd-generator) - Prisma generator to create an ER Diagram every time you generate your prisma client.

- [tsx](https://www.npmjs.com/package/tsx) - Is a CLI command (alternative to node) for seamlessly running TypeScript & ESM, in both commonjs & module package types.

- [@fastify/cors](https://www.npmjs.com/package/@fastify/cors) - Enables the use of CORS in a Fastify application.

- [@fastify/jwt](https://www.npmjs.com/package/@fastify/jwt) - JWT utils for Fastify, internally it uses fast-jwt.

Made with 💛 by Andrelino Silva
