# Aotearoa Airborne Pollen Collective (AAPC) - Backend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Our backend app will be implemented using Express.js, with the NoSQL database being hosted on MongoDB, and
authentication /
CDN services being delegated to Amazon Web Services (AWS).

# Documentation

You can find the API documentation on the [Wiki page](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/wiki) of this repository.

# Starting the Local Server

Make sure your working directory is in the backend root directory.

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

The default port is configured to `3000`. The environment is `LOCAL` by default, and will use local services.

Ping the Express API through [http://localhost:3000](http://localhost:3000). You should see the following response:

```json
{
    "message": "ok",
    "environment": "local"
}
```

# Deployment Rules

-   Any changes pushed to GitHub on **any** branch will be deployed to Vercel Development Preview. This is not public.
-   Any changes pushed on the `dev` branch will be deployed to the **development**
    environment ([https://dev-api.aapc-nz.org](https://dev-api.aapc-nz.org)).
-   Any changes pushed on the `main` branch will be deployed to the **production**
    environment ([https://api.aapc-nz.org](https://api.aapc-nz.org)).

# Environments

### `LOCAL`

When running the backend locally, the `ENV` will be `LOCAL` and use the `MemoryRepository` with data from the local JSON
files.
- **CDN**: Uses the local `LocalCDNService` which stores files into `@/src/static`, and is cleared every restart.
- **Auth**: Uses the local `LocalAuthService` which simulates behaviour from a real auth provider. The default master password is `admin` and email verification code `123456`.
- **Mailer**: Uses the local `ConsoleMailerService` which outputs incoming contact messages on the console.

### `DEV`

On [https://dev-api.aapc-nz.org](https://dev-api.aapc-nz.org) (the **development** environment), the `ENV` will be `DEV`
and use the `MongoRepository` with data from the **Development** MongoDB Atlas cluster (`aapc-dev`).

- **CDN**: Uses `AWSS3CDNServices` which stores files into the `dev-aapc-media` AWS S3 bucket.
- **Auth**: Uses `AWSCognitoAuthService` which interacts with the `aapc-users` userpool on AWS Cognito to provide authentication.
- **Mailer**: Uses `BrevoMailerService` which sends an email with the incoming contact message to an email address specified in `util/consts.ts`.

### `PROD`

On [https://api.aapc-nz.org](https://api.aapc-nz.org) (the **production** environment), the `ENV` will be `PROD` and use
the `MongoRepository` with data from the **Production** MongoDB Atlas cluster (`aapc-prod`).

- **CDN**: Uses `AWSS3CDNServices` which stores files into the `aapc-media` AWS S3 bucket.
- **Auth**: Uses `AWSCognitoAuthService` which interacts with the `aapc-users-prod` userpool on AWS Cognito to provide
  authentication.
- **Mailer**: Uses `BrevoMailerService` which sends an email with the incoming contact message to an email address
  specified in `util/consts.ts`.

# Environment Variables

By default, if a `.env` file that specifies `ENV` to be either `DEV` or `PROD` is not found, the app will fall back to using the `LOCAL` environment.

If an `.env` file is loaded and either `ENV=DEV` or `ENV=PROD`, the following environment variables must be specified:

- `MONGO_URI` - for accessing the database


- `BREVO_CLIENT_EMAIL` - for the mailer service
- `BREVO_CLIENT_PASSWORD`


- `AWS_ACCESS_KEY_ID` - credentials for an IAM User (not Role) on AWS with S3 Access
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`


- `JWT_SECRET` - A cryptographically secure secret token to sign JWT payloads used for authentication


- `AWS_COGNITO_USERPOOL_ID` - The AWS Cognito userpool ID for auth
- `AWS_COGNITO_CLIENT_ID` - The ID of a registered client on the above AWS Cognito userpool (**without** a secret token)


- `GOOGLE_RECAPTCHA_SECRET_KEY` - The secret key of Google's reCAPTCHA service
