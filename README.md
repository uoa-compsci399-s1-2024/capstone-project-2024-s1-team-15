# Aotearoa Airborne Pollen Collective (AAPC) Website

Project by **Team Bit by Bit** (Team 15, S1 2024)

Our project will enable the Aotearoa Airborne Pollen Collective (AAPC) to establish an online presence in order to
better inform the general public about the airborn pollen around us in New Zealand. We aim to develop a robust frontend
client that delivers information efficiently and beautifully to the AAPC's end users, as well as providing the researchers
behind the AAPC an intuitive Content Management System (CMS) for them to control the content they provide to their users.

## Development Team

- **Hunter Chen** - Tech Lead / Full-stack Developer
- **Logan Park** - Project Manager
- **Arnav Shekaran** - Designer / Developer
- **Gautham Gunasheelan** - Designer / Back-End Developer
- **Stanley Wu** - Designer / Front-End Developer
- **Samuel Kim** - UI/UX Designer / Front-End Developer

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

## Project Structure

This repository is a monorepo. Three modules are hosted on this repository - backend, frontend and types.

## Project setup

- Node.js 20^
- npm 10.2.4^

Project dependencies are specified in `package.json` files within each module ([main](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/blob/main/package.json), [frontend](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/blob/main/frontend/package.json), [backend](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/tree/main/backend/package.json), [types](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/tree/main/types/package.json)) to see which packages we used and their versions.

To run the project locally, try the following steps:

1. Clone this repository: `git clone https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15.git`
2. Install node (20.^) and npm (10.2.4^)
  *NOTE* the project may work on previous versions as well
3. Open terminal in the root folder of the repository
4. Install all dependencies: `npm i`
5. Run project: `npm run dev`

Alternatively, read through the individual `README.md`s of the [backend](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/blob/main/backend/README.md) and [frontend](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/blob/main/frontend/README.md) to see how to run the frontend and backend seperately. The frontend does depend on the backend running so the website may not run as expected if backend is not running as well.

## Git Structure

- **other branches**: New features are implemented in their own branches. These changes are then merged to `dev` through pull requests.

- `dev`: This branch is automatically deployed to [dev.aapc-nz.org](https://dev.aapc-nz.org/) with development environment credentials, and merged to `main` through pull requests.
- `main`: This branch is automatically deployed to [aapc-nz.org](https://aapc-nz.org/) with production environment credentials.

# Public Usage

## Site Visitors

Visitors can learn new concepts from the website. They have the ability to:

- [**Pollen**](https://www.aapc-nz.org/pollen): view the different types and how the levels vary throughout the seasons using the pollen calendar.
- [**Health**](https://www.aapc-nz.org/health): learn about the common symptons using the interactive body diagram and common strategies to reduce effects of hayfever.
- [**Research**](https://www.aapc-nz.org/research): browse through research projects and external research articles written by the AAPC members.
   <br>*NOTE*: currently, may 2024, all research articles were created by developers.
- [**News**](https://www.aapc-nz.org/news): browse through blog posts written by AAPC members & external media articles written about the AAPC and their work.
   <br>*NOTE*: currently, may 2024, all the news articles were created by developers.
- [**About**](https://www.aapc-nz.org/about): learn about who is in the AAPC, what they do and who supports them.
- [**Contact**](https://www.aapc-nz.org/contact): reach out to the AAPC with any questions, compliments, concerns, criticisms or requests for available pollen data.

## Authentication / User Management

Registered users are able to:

- Change display name
- Change display icon
- Manage uploaded images
- Change password
- Deactivate account

All users can register for an account on the website. As of currently, the site does not offer content unique to
signed-in users in comparison to anonymous site visitors.

By default, all newly registered users will have the basic `User` role. Users with the `Admin` role can assign
a `Maintainer` (or an `Admin`) role to any user, which enables them to manage site content as outlined below:

## Admins (Clients) & Site Maintainers

In addition to above, admins and maintainers have the ability to:

- Create and delete pollen datasets.
- Publish, edit and delete research articles.
- Publish, edit and delete external research articles.
- Publish, edit and delete news blog posts.
- Publish, edit and delete external news articles.

## Website URL

Our website is hosted at <https://aapc-nz.org/>.

## Future Plans

- Ideas 💡: These are either ideas for improvement of the code or the website features.
- Incomplete work ⌚: It could also be work that we weren't able to complete fully because of the limited time.

TODO: describe future plans!
Currently, we have either marked future plans with the tag 'future work' or added it to the milestone ['Future work'](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-15/milestone/4).

## Acknowledgements

TODO: You can list tutorials used, projects referred to, people consulted etc.

### Source of Pollen Images

Many (but not all) of the pollen images on the website are from [PalDat](https://www.paldat.org/) so we have followed their citation instructions:

> Notice: If you use a picture from PalDat you have to cite the name of the photographer of the picture and PalDat (2000 onwards, <www.paldat.org>).
