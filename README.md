# Aotearoa Airborne Pollen Collective (AAPC) Website
Project by **Team Bit by Bit** (Team 15, S1 2024)

Our project will enable the Aotearoa Airborne Pollen Collective (AAPC) to establish an online presence in order to
better inform the general public about the airborn pollen around us in New Zealand. We aim to develop a robust frontend
client that delivers information efficiently and beautifully to the AAPC's end users, as well as providing the researchers
behind the AAPC an intuitive Content Management System (CMS) for them to control the content they provide to their users.

### Our Infrastructure

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

Our frontend app will utilize Next.js's powerful server-side rendering features to supercharge the user experience, as well as TailwindCSS's
unique approach to styling to provide an efficient, and aesthetically pleasing website.

The backend will be implemented using Express.js, with the NoSQL database being hosted on MongoDB, and authentication / CDN
services being delegated to Amazon Web Services (AWS).

Both apps will be written using TypeScript to ensure type safety and maintainability for future maintainers of the website.

## Team Members
- **Hunter Chen** - Tech Lead / Full-stack Developer
- **Logan Park** - Project Manager
- **Arnav Shekaran** - Designer / Developer
- **Gautham Gunasheelan** - Designer / Back-End Developer
- **Stanley Wu** - Designer / Front-End Developer
- **Samuel Kim** - Designer / Front-End Developer

## Project Description

We are a newly established collective that is interested in airborne pollen around us and how climate change may be
affecting the pollen that we are seeing, and its impact on health.
The pollen collective brings together scientists and health professionals interested in pollen and the environment from
around New Zealand.
This is currently a partnership between 3 different Universities and with Auckland Museum.
We hope to grow this collective but to do so we need an online presence of the work that we are doing, so we can attract
public interest and support for our work.
This project aims to develop an online website to showcase our current and future work, and our team, and allow people
to contact us if they are interested. We also want to a place to host the pollen data so the public can search a calendar and see their
pollen data for the day but this may be in a 'freemium' type view

## Use of Pollen Images

We have used pollen images from [PalDat](https://www.paldat.org/)

and we have followed their citation instructions:

> Notice: If you use a picture from PalDat you have to cite the name of the photographer of the picture and PalDat (2000 onwards, <www.paldat.org>).

## Project Clients
Amy Chan

## Git Setup
### Branches
* feature branches: whenever we work on a new feature, we can make a seperate branch so that we can see what code changes this feature includes. These changes can be double checked by other teammates before being merged to `dev` branch using a pull request.
* `dev`: this branch is automatically deployed to [dev.aapc-nz.org](https://dev.aapc-nz.org/) so we can develop and test improvements before sharing with clients
* `main`: this branch is automatically deployed to [aapc-nz.org](https://aapc-nz.org/) and is shared with clients


