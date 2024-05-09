# Types for AAPC Website

In order for the backend and frontend to use the same types so that communication is more reliable between the two systems.

## Adding a new type

Here is the method to add a new type to the `@aapc/types` package:

1. make your type inside a file in the `src` folder
2. export your type from `main.ts`
3. increase the version in `package.json`
4. re-publish the package to [npm registry](https://www.npmjs.com/package/@aapc/types)

    currently, this happens when changes are made to the types and pushed to `dev` branch

<br />

Alternatively, simply run `npm run build` and copy the `dist` folder to wherever the type is to be used. E.g. for the frontend, copy `dist` and paste in `frontend/node_modules/@aapc/types/`. Removal of the `node_modules` folder will require doing this step again so publish using the steps above to avoid that scenario.
