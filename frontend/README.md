# Aotearoa Airborne Pollen Collective (AAPC) - Frontend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Our frontend app will utilize Next.js' powerful server-side rendering features to supercharge the user experience, as
well as TailwindCSS's
unique approach to styling to provide an efficient, and aesthetically pleasing website.

# Starting the Local Server

Change directory to the frontend (only if you are currently in the root directory):

```bash
cd frontend
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

The default port is configured to `3001`. The environment is `LOCAL` by default.

Open [http://localhost:3001](http://localhost:3001) with your browser to access the website.

# Deployment Rules

-   Any changes pushed to GitHub on **any** branch will be deployed to Vercel Development Preview. This is not public.
-   Any changes pushed on the `dev` branch will be deployed to the **development** environment ([https://dev.aapc-nz.org](https://dev.aapc-nz.org)).
-   Any changes pushed on the `main` branch will be deployed to the **production** environment ([https://www.aapc-nz.org](https://aapc-nz.org)).

# Environments

### `LOCAL`

When running the frontend locally, the `ENV` will be `LOCAL`, and the backend endpoint URI will be configured to `http://localhost:3000`.

### `DEV`

On [https://dev.aapc-nz.org](https://dev.aapc-nz.org) (the **development** environment), the `ENV` will be `DEV`, and the backend endpoint URI will be configured to `https://dev-api.aapc-nz.org`.

### `PROD`

On [https://www.aapc-nz.org](https://aapc-nz.org) (the **production** environment), the `ENV` will be `PROD`, and the backend endpoint URI will be configured to `https://api.aapc-nz.org`.
