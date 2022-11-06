# NLW 10 COPA /ignite

Projeto desenvolvido durante a Next Level Week Copa, na trilha Ignite.

## Routes for API application (back-end)

---
<br />
**../routes/auth.ts**

---

- **Get user information**

```ts
fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      return { user: request.user };
    }
  );
```

### METHOD POST

---

- **Get user token and public information from Google API oauth2**

```ts
fastify.post("/users", async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "7 days",
      }
    );

    return { token };
  }
```

## Libs usage

- [zod](https://www.npmjs.com/package/zod) | TypeScript-first schema validation with static type inference
