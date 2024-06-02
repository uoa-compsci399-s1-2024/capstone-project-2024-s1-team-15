# Aotearoa Airborne Pollen Collective (AAPC) Website

Project by **Team Bit by Bit** (Team 15, S1 2024)

Our project will enable the Aotearoa Airborne Pollen Collective (AAPC) to establish an online presence in order to
better inform the general public about the airborne pollen around us in New Zealand. We aim to develop a robust frontend
client that delivers information efficiently and beautifully to the AAPC's end users, as well as providing the researchers
behind the AAPC an intuitive Content Management System (CMS) for them to control the content they provide to their users.

## Development Team

- **Hunter Chen** @HuzzNZ - Tech Lead / Full-stack Developer
- **Logan Park** @junjunjun1 - Project Manager
- **Arnav Shekaran** @arnard76 - Designer / Full-stack Developer
- **Gautham Gunasheelan** @Gautham-27 - Designer / Full-stack Developer
- **Stanley Wu** @sharukyen - Designer / Frontend Developer
- **Samuel Kim** @saamuelkim - UI/UX Designer / Frontend Developer

## Project Clients

- Amy Chan: <a.chan@auckland.ac.nz>
- Katherine Holt: <k.holt@massey.ac.nz>
- Stuti Misra: <s.misra@auckland.ac.nz>

## Clients' Description

> We are a newly established collective that is interested in airborne pollen around us and how climate change may be
affecting the pollen that we are seeing, and its impact on health.
The pollen collective brings together scientists and health professionals interested in pollen and the environment from
around New Zealand.
This is currently a partnership between 3 different Universities and with Auckland Museum.
We hope to grow this collective but to do so we need an online presence of the work that we are doing, so we can attract
public interest and support for our work.
This project aims to develop an online website to showcase our current and future work, and our team, and allow people
to contact us if they are interested. We also want to a place to host the pollen data so the public can search a calendar and see their
pollen data for the day but this may be in a 'freemium' type view

## Project management

This project was developed collaboratively with the help of [GitHub Projects](https://github.com/orgs/uoa-compsci399-s1-2024/projects/18), which helped us organize issues by milestones, and clearly laid out a Kanban-style view of our current progress, as well as how our fellow team members were getting along. In addition, GitHub Projects also assisted our team in knowing what issues to prioritize on, and in picking our next tasks.

## Project Technology Stack

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

Our frontend app utilizes Next.js's powerful server-side rendering features to supercharge the user experience, as well as TailwindCSS's
revolutionary approach to styling to provide an efficient yet aesthetically pleasing website.

The backend is implemented with Express.js, with the NoSQL database being hosted on MongoDB Atlas, and authentication / CDN
services being delegated to Amazon Web Services (AWS Cognito & AWS S3).

The entire project is written with TypeScript using strict, type-safe code to ensure type safety and maintainability for future maintainers of the website.


# Project Structure

This repository is a monorepo. Three modules are hosted on this repository - backend, frontend and types.

Backend is a standalone app, but frontend will require backend to be running, as it fetches data from `localhost:3000` by default, which is where the backend app listens.

Types is a static package hosted on `npm`. There is no need to run it.

### Prerequisites

- Node.js 20^
- npm 10.2.4^

Project dependencies are specified in `package.json` files within each module (frontend, backend, types), and is
managed by npm:
- [Frontend package.json](frontend/package.json)
- [Backend package.json](backend/package.json)
- [Types package.json](types/package.json)

## Frontend
Make sure your working directory is in the frontend module's root directory `/frontend`.

**To start the development server:**

1. Install all dependencies using `npm i`.
2. Start the Next.js development server using `npm run dev`.
3. The development server should be started on `localhost:3001`.

By default, the app will send API requests defined within `@/app/services` to `localhost:3000`. To configure this, you can change the values defined in `@/app/lib/consts.ts`.

For more detailed information, check out the [README.md for the frontend](frontend/README.md).

## Backend
Make sure your working directory is in the backend module's root directory `/backend`.

**To start the development server:**

1. Install all dependencies using `npm i`.
2. Optionally, specify a `.env` environment variables file. By default, the backend will use the `LOCAL` environment and load local services that do not require additional environment variables. Exporting `ENV=DEV` or `ENV=PROD` in `.env` will force the app to run in development or production environment, which uses external services that require additional credentials. Error messages will be helpful to help you determine which services are missing required environment variables.
3. Start the development server using `npm run dev`.
4. The development server should be started on `localhost:3000`.

For more detailed information, check out the [README.md for the backend](backend/README.md).

## Types
This is a static package including data type definitions used by both the frontend and backend services.

To install this package, run `npm install @aapc/types`.

For more detailed information, check out the [README.md for types package](types/README.md).

## Git Structure

- **other branches**: New features are implemented in their own branches. These changes are then merged to `dev` through pull requests.

- `dev`: This branch is automatically deployed to [dev.aapc-nz.org](https://dev.aapc-nz.org/) with development environment credentials, and merged to `main` through pull requests.
- `main`: This branch is automatically deployed to [www.aapc-nz.org](https://aapc-nz.org/) with production environment credentials.

# Public Usage

## Site Visitors

Visitors can learn new concepts from the website. They have the ability to:

- [**Pollen**](https://www.aapc-nz.org/pollen): View the different types and how the levels vary throughout the seasons using the pollen calendar.
- [**Health**](https://www.aapc-nz.org/health): Learn about the common symptons using the interactive body diagram and common strategies to reduce effects of hayfever.
- [**Research**](https://www.aapc-nz.org/research): Browse through research projects and external research articles written by the AAPC members. (As of the date of submission, all articles were created using a dummy account as placeholders.)
- [**News**](https://www.aapc-nz.org/news): Browse through blog posts written by AAPC members & external media articles written about the AAPC and their work. (As of the date of submission, all articles were created using a dummy account as placeholders.)
- [**About**](https://www.aapc-nz.org/about): Learn about who the AAPC are, what they do and who they are supported by.
- [**Contact**](https://www.aapc-nz.org/contact): Reach out to the AAPC with any questions, compliments, concerns, criticisms or requests for available pollen data.


## Authentication / User Management

Registered users are able to:

- Change display name
- Change display icon
- Manage uploaded images
- Change password

on the [**My Account**](https://www.aapc-nz.org/my-account) page.

All users can register for an account on the website using the [**Signup**](https://www.aapc-nz.org/signup) page, and registered users can log into their account on the [**Login**](https://www.aapc-nz.org/login) page.

As of currently, the site does not offer content unique to signed-in users in comparison to anonymous site visitors.

By default, all newly registered users will have the basic `User` role. Users with the `Admin` role can assign
a `Maintainer` (or an `Admin`) role to any user on the [**Manage Users**](https://www.aapc-nz.org/manage-users) page, which enables them to manage site content as outlined below:

## Admins (Clients) & Site Maintainers

In addition to above, admins and maintainers have the ability to:

- Create and delete pollen datasets.
- Publish, edit and delete research articles.
- Publish, edit and delete external research articles.
- Publish, edit and delete news blog posts.
- Publish, edit and delete external news articles.

## Website URL

Our website is hosted at <https://www.aapc-nz.org/>.

# Future Plans

Future tasks for the website are outlined as [issues marked with the **Future Work** label](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%93%85+future+work%22).
These include potential work that were identified throughout the project, or unfinished planned work due to the submission deadline.

# Acknowledgements

Special thanks to the University of Auckland AWS team for a speedy correspondence regarding requesting IAM User access, as well as for providing AWS services to us for free, which enabled us to develop our project using services provided by AWS.

### Pollen Images

Many pollen images displayed on the website were retrieved from [PalDat](https://www.paldat.org/), and we have followed their citation instructions:

> Notice: If you use a picture from PalDat you have to cite the name of the photographer of the picture and PalDat (2000 onwards, <www.paldat.org>).
