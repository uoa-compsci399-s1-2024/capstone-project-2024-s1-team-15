# Aotearoa Airborne Pollen Collective (AAPC) - Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Our backend app will be implemented using Express.js, with the NoSQL database being hosted on MongoDB, and authentication /
CDN services being delegated to Amazon Web Services (AWS).

## Install Dependencies

Install dependencies using `npm`:
```bash
npm i
```

## Starting the Development Server

```bash
npm run dev
```

The default port is configured to `3000`.

Ping the Express API through [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
npm run build
```

Optionally, start the production server using:

```bash
npm run start
```
