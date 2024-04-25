# Aotearoa Airborne Pollen Collective (AAPC) - Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Our backend app will be implemented using Express.js, with the NoSQL database being hosted on MongoDB, and authentication /
CDN services being delegated to Amazon Web Services (AWS).

# Starting the Local Server

Change directory to the backend (only if you are currently in the root directory):

```bash
cd backend
```

## Install Dependencies

Install dependencies using `npm`:

```bash
npm i
```

## Starting the Development Server

```bash
npm run dev
```

The default port is configured to `3000`. The environment is `LOCAL` by default, and will use the `MemoryRepository`.

Ping the Express API through [http://localhost:3000](http://localhost:3000). You should see the following response:

```json
{
    "message": "ok"
    "environment": "local"
}
```

# Deployment Rules

-   Any changes pushed to github on **any** branch will be deployed to Vercel Development Preview. This is not public.
-   Any changes pushed on the `dev` branch will be deployed to the **development** environment ([https://dev-api.aapc-nz.org](https://dev-api.aapc-nz.org)).
-   Any changes pushed on the `main` branch will be deployed to the **production** environment ([https://api.aapc-nz.org](https://api.aapc-nz.org)).

# Environments

### `LOCAL`

When running the backend locally, the `ENV` will be `LOCAL` and use the `MemoryRepository` with data from the local JSON files.

### `DEV`

On [https://dev-api.aapc-nz.org](https://dev-api.aapc-nz.org) (the **development** environment), the `ENV` will be `DEV` and use the `MongoRepository` with data from the **Development** MongoDB Atlas cluster.

### `PROD`

On [https://api.aapc-nz.org](https://api.aapc-nz.org) (the **production** environment), the `ENV` will be `PROD` and use the `MongoRepository` with data from the **Production** MongoDB Atlas cluster.
