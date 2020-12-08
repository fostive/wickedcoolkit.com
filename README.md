# heroku-wicked-coolkit

Just a place for me to put some things for now.

-   [Google doc with Heroku team](https://docs.google.com/document/d/1t8U1MyEGYhLsSJ-1dwmGf-QbldGaLrADjOcpWfW-63E/edit)
-   [Artwork and things](https://www.dropbox.com/sh/9vpgvgjpj1dpr4n/AAD2uC69Io4UurOauaNG2SnLa?dl=0)

## Docs

-   Create a database with `createdb heroku-wicked-coolkit`
-   `npx knex migrate:latest`

## How to start?

Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).
